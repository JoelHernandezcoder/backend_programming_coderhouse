const { v4: uuidV4 } = require('uuid');
const Product = require('../models/Product.js');

const getProducts = async () => {
  try {
    const productsList = await Product.find();
    return productsList;
  } catch (e) {
    console.log(e);
  }
};

const getProduct = async ({ id }) => {
  try {
    const product = await Product.findOne({ id: id });
    if (product.length == 0) {
      return res.status(404).json({
        msg: `There is no product with id ${id}`,
      });
    }
    return product;
  } catch (e) {
    console.log(e);
  }
};

const addProduct = async ({ data }) => {
  const product = {
    id: uuidV4(),
    timestamp: Date.now(),
    ...data,
  };
  try {
    await Product.create(product);
    return product;
  } catch (e) {
    console.log(e);
  }
};

const modifyProduct = async ({ id, data }) => {
  const product = {
    id,
    timestamp: Date.now(),
    ...data,
  };
  try {
    let response = await Product.findOne({ id: id });
    if (response == null) {
      return res.status(404).json({
        msg: `There is no product with id ${id}`,
      });
    }
    response = await Product.updateOne({ id: id }, { $set: product });
    const newProduct = await Product.findOne({ id: id });
    return newProduct;
  } catch (e) {
    console.log(e);
  }
};

const deleteProduct = async ({ id }) => {
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
