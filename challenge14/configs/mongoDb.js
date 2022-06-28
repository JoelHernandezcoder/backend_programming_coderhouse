const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const dbConnection = async () => {
  mongoose.connect(process.env.MONGO_URI, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('🔥 Connected to mongodb');
    }
  });
};

module.exports = {
  dbConnection,
};
