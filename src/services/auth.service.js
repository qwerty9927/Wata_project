const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")
const Connection = require("../db/connect")
const config = require("../configs")
const { userString } = require("../constants/entityName")
const transporter = require("../helpers/mailer")
const { authMessageResponse } = require("../constants")
const {
  ConflictResponse,
  BadRequest,
  AuthFailureResponse,
} = require("../common/error.response")

class AuthService {
  async getUserRepository() {
    return (await Connection.getInstance()).getRepository(userString)
  }

  async register(user_name, user_password, user_email, userInfo) {
    // Is exist user
    const foundUser = await (
      await this.getUserRepository()
    ).findOneBy([{ user_name }, { user_email }])
    if (foundUser) {
      throw new ConflictResponse(authMessageResponse.conflictUser)
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(user_password, 10)

    // Write to database
    await (
      await this.getUserRepository()
    ).insert({
      user_name,
      user_password: hashedPassword,
      user_email,
      ...userInfo,
    })
    return userInfo
  }

  async login(user_name, user_password) {
    // Is exist user
    const foundUser = await (
      await this.getUserRepository()
    ).findOne({
      relations: {
        user_role_relation: true,
      },
      where: {
        user_name,
      },
    })
    if (!foundUser) {
      throw new AuthFailureResponse(authMessageResponse.authFailure)
    }

    // Compare password
    const isMatching = await bcrypt.compare(
      user_password,
      foundUser.user_password
    )
    if (!isMatching) {
      throw new AuthFailureResponse(authMessageResponse.authFailure)
    }

    // Create token
    const payload = {
      user_id: foundUser.user_id,
      role_name: foundUser.user_role_relation.role_name,
    }
    const token = jwt.sign(payload, config.jwtSecret, {
      expiresIn: config.tokenExpiresIn,
    })

    // Write token
    const hashedToken = await bcrypt.hash(token, 10)
    await (
      await this.getUserRepository()
    ).update({ user_name }, { token: hashedToken })
    return token
  }

  async logout(user_id) {
    // Find user by id
    const foundUser = await (
      await this.getUserRepository()
    ).findOneBy({
      user_id,
    })
    if (!foundUser) {
      throw new AuthFailureResponse(authMessageResponse.authFailure)
    }

    // Delete token
    await (await this.getUserRepository()).update({ user_id }, { token: null })
  }

  async requestChangePassword(user_email){
    // Find user by email
    const foundUser = await (await this.getUserRepository()).findOneBy({
      user_email
    })
    if(!foundUser){
      throw new BadRequest(authMessageResponse.emailNotSigned)
    }
    
    // Create token
    const payload = {
      user_email
    }
    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: config.resetPasswordTokenExpiresIn })

    // Write to database
    await (await this.getUserRepository()).update(
      { user_id: foundUser.user_id },
      { verify_token: token}
    )

    // Send confirm to user
    const comfirmLink = `http://${config.server.host}:${config.server.port}/api/v1/auth/comfirm-change-password?email=${user_email}&token=${token}`
    const mailOptions = {
      from: config.emailName,
      to: user_email,
      subject: "[Pizza store] Comfirm reset password",
      text: `We have received a request to reset the password for your account. To complete this process, please click on the link below. ${comfirmLink}`,
    }

    await transporter.sendMail(mailOptions)
  }

  async verificationOfChange(user_email, token) {
    // Find user by email
    const foundUser = await (await this.getUserRepository()).findOneBy({
      user_email
    })
    if(!foundUser){
      throw new BadRequest(authMessageResponse.emailNotSigned)
    }

    if(token !== foundUser.verify_token){
      throw new BadRequest(authMessageResponse.tokenIsNotExist)
    }

    // Verify token
    try {
      jwt.verify(foundUser.verify_token, config.jwtSecret)
      this.resetPassword(user_email, foundUser)
    } catch{
      throw new AuthFailureResponse(authMessageResponse.tokenExpired)
    }
  }

  async resetPassword(user_email, foundUser) {
    // Generate password
    const password = crypto.randomBytes(4).toString("hex")

    // Send mail
    const mailOptions = {
      from: config.emailName,
      to: user_email,
      subject: "[Pizza store] Reset password",
      text: `Your new password: ${password}`,
    }

    await transporter.sendMail(mailOptions)

    // Send mail success
    // Modify password in database
    // Hash password
    const hashPassword = await bcrypt.hash(password, 10)
    await (
      await this.getUserRepository()
    ).update({ user_id: foundUser.user_id }, { user_password: hashPassword, verify_token: null })
  }
}

module.exports = new AuthService()
