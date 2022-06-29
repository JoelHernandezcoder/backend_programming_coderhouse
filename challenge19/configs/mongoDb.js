const dotenv = require('dotenv');
const mongoose = require('mongoose');
const logger = require('../utils/logger.js');

dotenv.config();

const dbConnection = async () => {
  mongoose.connect(process.env.MONGO_URI, (err) => {
    if (err) {
      logger.error('❌ Error to connect MongoDB');
    } else {
      logger.info('🔥 Connected to mongodb');
    }
  });
};

module.exports = {
  dbConnection,
};
