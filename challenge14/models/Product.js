const mongoose = require('mongoose');

const schemaProduct = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
  },
  timestamp: {
    type: Date,
    required: true,
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    unique: true,
  },
  description: {
    type: String,
  },
  photo: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Products', schemaProduct);
