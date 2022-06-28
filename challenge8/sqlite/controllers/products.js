const { response, request } = require('express');
const { v4: uuidV4 } = require('uuid');
const { SQLiteConfig } = require('../configs/SQLite');
const knex = require('knex')(SQLiteConfig);
const Product = require('../models/Product');

const isAdmin = process.env.ADMIN;

const getProducts = async (req = request, res = response) => {
  try {
    const productsList = await knex.select().from('product');
    return res.json({
      productsList,
    });
  } catch (e) {
    console.log(e);
  }
};

const getProduct = async (req = request, res = response) => {
  const { id } = req.params;
  try {
    const product = await knex.from('product').select().where('id', '=', id);
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
  if (!isAdmin) {
    return res.status(401).json({
      msg: 'You are not authorized to perform this operation',
    });
  }
  const { name, description, code, photo, price, stock } = req.body;
  const product = new Product(
    uuidV4(),
    Date.now(),
    name,
    description,
    code,
    photo,
    price,
    stock
  );
  try {
    await knex.insert(product).from('product');
    // To convert milliseconds to dates: new Date(product.timestamp).toLocaleString());
    return res.json({
      product,
    });
  } catch (e) {
    console.log(e);
  }
};

const modifyProduct = async (req = request, res = response) => {
  if (!isAdmin) {
    return res.status(401).json({
      msg: 'You are not authorized to perform this operation',
    });
  }
  const { id } = req.params;
  const { name, description, code, photo, price, stock } = req.body;
  const product = new Product(
    id,
    Date.now(),
    name,
    description,
    code,
    photo,
    price,
    stock
  );
  try {
    const response = await knex.from('product').where('id', id).update(product);
    if (response == 0) {
      return res.status(404).json({
        msg: `There is no product with id ${id}`,
      });
    }
    return res.json({
      product,
    });
  } catch (e) {
    console.log(e);
  }
};

const deleteProduct = async (req = request, res = response) => {
  if (!isAdmin) {
    return res.status(401).json({
      msg: 'You are not authorized to perform this operation',
    });
  }
  const { id } = req.params;
  try {
    const response = await knex.from('product').where('id', '=', id).del();
    if (response == 0) {
      return res.status(404).json({
        msg: `There is no product with id ${id}`,
      });
    }
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
