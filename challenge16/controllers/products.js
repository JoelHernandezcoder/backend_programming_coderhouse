const { response, request } = require('express');
const { v4: uuidV4 } = require('uuid');
const Product = require('../models/Product.js');
const logger = require('../utils/logger.js');

const getProducts = async (req = request, res = response) => {
  try {
    const productsList = await Product.find();
    return res.json(productsList);
  } catch (e) {
    logger.error(e);
  }
};

const getProduct = async (req = request, res = response) => {
  const { id } = req.params;
  try {
    const product = await Product.find({ id: id });
    if (product.length == 0) {
      logger.warn(`There is no product with id ${id}`);
      return res.status(404).json({
        msg: `There is no product with id ${id}`,
      });
    }
    return res.status(200).json({
      product,
    });
  } catch (e) {
    logger.error(e);
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
    logger.error(e);
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
      logger.warn(`There is no product with id ${id}`);
      return res.status(404).json({
        msg: `There is no product with id ${id}`,
      });
    }
    response = await Product.updateOne({ id: id }, { $set: product });
    logger.info(response);
    return res.json({
      product,
    });
  } catch (e) {
    logger.error(e);
  }
};

const deleteProduct = async (req = request, res = response) => {
  const { id } = req.params;
  try {
    let response = await Product.findOne({ id: id });
    if (response == null) {
      logger.warn(`There is no product with id ${id}`);
      return res.status(404).json({
        msg: `There is no product with id ${id}`,
      });
    }
    response = await Product.deleteOne({ id: id });
    logger.info('Product removed successfully');
    res.status(200).json({
      msg: 'Product removed successfully!',
    });
  } catch (e) {
    logger.error(e);
  }
};

module.exports = {
  getProducts,
  getProduct,
  addProduct,
  modifyProduct,
  deleteProduct,
};
