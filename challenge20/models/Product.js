const mongoose = require('mongoose');
const Config = require('../config.js');

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    unique: true,
  },
  description: {
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

const ProductoModel = mongoose.model(Config.db.collection, ProductSchema);

module.exports = ProductoModel;
