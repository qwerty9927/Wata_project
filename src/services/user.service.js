const bcrypt = require("bcrypt")
const Connection = require('../db/connect')
const { userString, roleString } = require("../constants/entityName")
const { BadRequest } = require('../common/error.response')
const { userMessageResponse } = require("../constants")
const { Not } = require("typeorm")

class UserService {
  constructor() {
    this.selection = {
      user_id: true,
      full_name: true,
      user_address: true,
      user_phone: true,
      user_email: true
    }
  }
  async getUserRepository() {
    return (await Connection.getInstance()).getRepository(userString)
  }

  async getRoleRepository() {
    return (await Connection.getInstance()).getRepository(roleString)
  }

  async getUserInfo(user_id) {
    // Is exist user
    const foundUser = await (await this.getUserRepository()).findOne({
      select: this.selection,
      where: {
        user_id
      }
    })
    if(!foundUser){
      throw new BadRequest(userMessageResponse.userNotExist)
    }
    return foundUser
  }

  async changeRole(user_id, role_id) {
    // Is exist user
    const foundUser = await (await this.getUserRepository()).findOneBy({
      user_id
    })
    if(!foundUser){
      throw new BadRequest(userMessageResponse.userNotExist)
    }

    // Is exist role id
    const foundRoleId = await (await this.getRoleRepository()).findOneBy({
      role_id
    })
    if(!foundRoleId){
      throw new BadRequest(userMessageResponse.roleIdNotExist)
    }

    // Update to database
    await (await this.getUserRepository()).update(
      { user_id },
      { role_id }
      )
  }

  async modifyProfile(user_id, profile = {}) {
    // Is exist user
    const foundUser = await (await this.getUserRepository()).findOneBy({
      user_id
    })
    if(!foundUser){
      throw new BadRequest(userMessageResponse.userNotExist)
    }

    // Is unique email
    if(profile.user_email){
      const foundUserWithMail = await (await this.getUserRepository()).findOneBy({
        user_email: profile.user_email,
        user_id: Not(user_id)
      })
      if(foundUserWithMail){
        throw new BadRequest(userMessageResponse.emailIsExist)
      }
    }

    // Update to database
    await (await this.getUserRepository()).update(
      { user_id },
      profile
    )
  }

  async changePassword(user_id, current_password, new_password) {
    // Is exist user
    const foundUser = await (await this.getUserRepository()).findOneBy({
      user_id
    })
    if(!foundUser){
      throw new BadRequest(userMessageResponse.userNotExist)
    }

    // Compare password
    const isMatching = await bcrypt.compare(current_password, foundUser.user_password)
    if(!isMatching){
      throw new BadRequest(userMessageResponse.passwordWrong)
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(new_password, 10)

    // Update to database
    await (await this.getUserRepository()).update(
      { user_id },
      { user_password: hashedPassword }
    )
  }

  async getAllUser() {
    const foundUsers = await (await this.getUserRepository()).find({
      select: {
        ...this.selection,
        role_id: true
      }
    })
    return foundUsers
  }
}

module.exports = new UserService()