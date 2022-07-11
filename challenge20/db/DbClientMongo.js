/* eslint-disable no-console */
const Config = require('../config.js');
const CustomError = require('../errors/CustomError.js');
const mongoose = require('mongoose');
const DbClient = require('./DbClient.js');

class MyMongoClient extends DbClient {
  constructor() {
    super();
    this.connected = false;
    this.client = mongoose;
  }

  async connect() {
    try {
      await this.client.connect(Config.db.cnxStr + Config.db.name, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('connected database');
      this.connected = true;
    } catch (error) {
      throw new CustomError(500, 'error connecting to mongodb 1', error);
    }
  }

  async disconnect() {
    try {
      await this.client.connection.close();
      console.log('connected database');
      this.connected = false;
    } catch (error) {
      throw new CustomError(500, 'error connecting to mongodb 2', error);
    }
  }
}

module.exports = MyMongoClient;
