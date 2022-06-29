const mongoose = require('mongoose');

const schemaCart = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
  },
  timestamp: {
    type: Date,
    required: true,
  },
  product: {
    type: Array,
  },
});

module.exports = mongoose.model('Cart', schemaCart);
