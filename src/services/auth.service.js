const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const nodemailer = require("nodemailer")
const crypto = require("crypto")
const Connection = require("../db/connect")
const config = require("../configs")
const { userString } = require("../constants/entityName")
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
    const foundUser = await (await this.getUserRepository()).findOneBy([
      { user_name },
      { user_email },
    ])
    if (foundUser) {
      throw new ConflictResponse(authMessageResponse.conflictUser)
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(user_password, 10)

    // Write to database
    await (await this.getUserRepository()).insert({
      user_name,
      user_password: hashedPassword,
      user_email,
      ...userInfo
    })
    return userInfo
  }

  async login(user_name, user_password) {
    // Is exist user
    const foundUser = await (await this.getUserRepository()).findOne({
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
    await (await this.getUserRepository()).update(
      {user_name},
      {token}
    )
    return token
  }

  async logout(user_id) {
    // Find user by id
    const foundUser = await (await this.getUserRepository()).findOneBy({
      user_id
    })
    if(!foundUser){
      throw new AuthFailureResponse(authMessageResponse.authFailure)
    }

    // Delete token
    await (await this.getUserRepository()).update(
      {user_id},
      {token: null}
    )
  }

  async resetPassword(user_email) {
    // Find user by email
    const foundUser = await (await this.getUserRepository()).findOneBy({
      user_email,
    })
    if (!foundUser) {
      throw new BadRequest(authMessageResponse.emailNotSigned)
    }

    // Generate password
    const password = crypto.randomBytes(4).toString("hex")

    // Send mail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: config.emailName,
        pass: config.emailPassword,
      },
    })

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
    await (await this.getUserRepository()).update(
      { user_id: foundUser.user_id },
      { user_password: hashPassword }
    )
  }
}

module.exports = new AuthService()
