const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const nodemailer = require("nodemailer")
const crypto = require("crypto")
const Connection = require("../db/connect")
const { userString } = require("../constance/entityName")
const {
  ConflictResponse,
  BadRequest,
  AuthFailureResponse,
} = require("../common/error.response")

class AuthService {
  static getUserRepository() {
    return Connection.getInstance().getRepository(userString)
  }

  static async register(user_name, user_password, user_email, userInfo) {
    // Is exist user
    const foundUser = await this.getUserRepository().findOneBy([
      { user_name },
      { user_email },
    ])
    if (foundUser) {
      throw new ConflictResponse("User is existed!")
    }
    // Hash password
    const hashPassword = await bcrypt.hash(user_password, 10)

    // Write to database
    this.getUserRepository().insert({
      user_name,
      user_password: hashPassword,
      user_email,
      ...userInfo,
    })
    return userInfo
  }

  static async login(user_name, user_password) {
    // Is exist user
    const foundUser = await this.getUserRepository().findOne({
      relations: {
        user_role_relation: true,
      },
      where: {
        user_name,
      },
    })
    console.log(foundUser)
    if (!foundUser) {
      throw new AuthFailureResponse("User and password are not correct!")
    }

    // Compare password
    const isMatching = await bcrypt.compare(
      user_password,
      foundUser.user_password
    )
    if (!isMatching) {
      throw new AuthFailureResponse("User and password are not correct!")
    }

    // Create token
    const payload = {
      user_id: foundUser.user_id,
      role_name: foundUser.user_role_relation.role_name,
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "60s",
    })
    return token
  }

  static logout() {
    return null
  }

  static async resetPassword(user_email) {
    // Find user by email
    const foundUser = await this.getUserRepository().findOneBy({
      user_email,
    })
    if (!foundUser) {
      throw new BadRequest("Email is not signed!")
    }

    // Generate password
    const password = crypto.randomBytes(4).toString("hex")

    // Send mail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_NAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    })

    const mailOptions = {
      from: process.env.EMAIL_NAME,
      to: user_email,
      subject: "[Pizza store] Reset password",
      text: `Your new password: ${password}`,
    }

    await transporter.sendMail(mailOptions)

    // Send mail success
    // Modify password in database
      // Hash password
    const hashPassword = await bcrypt.hash(password, 10)
    await this.getUserRepository().update(
      { user_id: foundUser.user_id },
      { user_password: hashPassword }
    )
  }
}

module.exports = AuthService
