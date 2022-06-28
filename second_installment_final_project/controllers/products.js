const { response, request } = require('express');
const { v4: uuidV4 } = require('uuid');
const Product = require('../models/Product.js');

const getProducts = async (req = request, res = response) => {
  try {
    const productsList = await Product.find();
    return res.json(productsList);
  } catch (e) {
    console.log(e);
  }
};

const getProduct = async (req = request, res = response) => {
  const { id } = req.params;
  try {
    const product = await Product.find({ id: id });
    if (product.length == 0) {
      return res.status(404).json({
        msg: `There is no product with id ${id}`,
      });
    }
    return res.status(200).json({
      product,
    });
  } catch (e) {
    console.log(e);
  }
};

const addProduct = async (req = request, res = response) => {
  const { name, description, photo, price, stock } = req.body;
  const product = {
    id: uuidV4(),
    timestamp: Date.now(),
    name,
    description,
    photo,
    price,
    stock,
  };
  try {
    await Product.create(product);
    return res.json({
      product,
    });
  } catch (e) {
    console.log(e);
  }
};

const modifyProduct = async (req = request, res = response) => {
  const { id } = req.params;
  const { name, description, photo, price, stock } = req.body;
  const product = {
    id,
    timestamp: Date.now(),
    name,
    description,
    photo,
    price,
    stock,
  };
  try {
    let response = await Product.findOne({ id: id });
    if (response == null) {
      return res.status(404).json({
        msg: `There is no product with id ${id}`,
      });
    }
    response = await Product.updateOne({ id: id }, { $set: product });
    console.log(response);
    return res.json({
      product,
    });
  } catch (e) {
    console.log(e);
  }
};

const deleteProduct = async (req = request, res = response) => {
  const { id } = req.params;
  try {
    let response = await Product.findOne({ id: id });
    if (response == null) {
      return res.status(404).json({
        msg: `There is no product with id ${id}`,
      });
    }
    response = await Product.deleteOne({ id: id });
    res.status(200).json({
      msg: 'Product removed successfully!',
    });
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  getProducts,
  getProduct,
  addProduct,
  modifyProduct,
  deleteProduct,
};
