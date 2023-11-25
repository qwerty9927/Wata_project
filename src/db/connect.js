const AppDataSource = require("./data-source.js")
const logger = require("../helpers/logger.js")

class Connection {
  static async connect() {
    try {
      await AppDataSource.initialize();
      // console.log("Data source has been initialized. Connected successfully!")
      logger.info('Database connected');
    } catch (error) {
      // console.log("Error during initializing source. Connection failed!", error)
      logger.error(`Error connecting to database: ${error}`);
    }
  }
  static async getInstance() {
    if (AppDataSource.isInitialized) {
      return AppDataSource
    } else {
      await this.connect()
      return AppDataSource
    }
  }
}

module.exports = Connection