const { BadRequest } = require("../common/error.response")
const Connection = require("../db/connect")
const { storeString } = require("../constants/entityName")
const { storeMessageResponse } = require("../constants")

class StoreService {
  async getStoreRepository() {
    return (await Connection.getInstance()).getRepository(storeString)
  }

  async getAllStore() {
    return await (await this.getStoreRepository()).find()
  }

  async getStoreInfo(store_id) {
    // Is exist store
    const foundStore = await (
      await this.getStoreRepository()
    ).findOneBy({
      store_id,
    })
    if (!foundStore) {
      throw new BadRequest(storeMessageResponse.storeNotExist)
    }
    return foundStore
  }

  async createStore(store_name, store_address) {
    await (
      await this.getStoreRepository()
    ).insert({
      store_name,
      store_address,
    })
  }

  async modifyStoreInfomation(store_id, infomation = {}) {
    // Is exist store
    const foundStore = await (
      await this.getStoreRepository()
    ).findOneBy({
      store_id,
    })
    if (!foundStore) {
      throw new BadRequest(storeMessageResponse.storeNotExist)
    }

    // Write to database
    await (
      await this.getStoreRepository()
    ).update(
      {
        store_id,
      },
      infomation
    )
  }

  async getAllOrderOfStore(store_id) {
    // Is exist store
    const foundStoreAndOrder = await (
      await this.getStoreRepository()
    ).findOne({
      relations: {
        store_order_relation: true,
      },
      where: {
        store_id,
      },
    })
    if (!foundStoreAndOrder) {
      throw new BadRequest(storeMessageResponse.storeNotExist)
    }

    return foundStoreAndOrder
  }
}

module.exports = new StoreService()
