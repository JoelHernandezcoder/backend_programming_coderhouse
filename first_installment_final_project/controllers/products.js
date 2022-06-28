const { response, request } = require('express');
const { promises: fsp } = require('fs');
const { v4: uuidV4 } = require('uuid');
const Product = require('../models/Product');

const productsDB = './db/products.txt';
const utf = 'utf-8';

const getProducts = async (req = request, res = response) => {
  const productsList = await readProductsDB();
  return res.json({
    productsList,
  });
};

const getProduct = async (req = request, res = response) => {
  const { id } = req.params;
  const productsList = await readProductsDB();
  const productToFind = productsList.filter((product) => product.id == id)[0];
  if (productToFind == undefined) {
    return res.status(404).json({
      msg: `There is no product with id: ${id}`,
    });
  }
  const product = productsList.filter((product) => product.id == id);
  return res.status(200).json({
    product,
  });
};

const addProduct = async (req = request, res = response) => {
  const { name, description, code, photo, price, stock } = req.body;
  const productsList = await readProductsDB();
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
  // To convert milliseconds to dates: new Date(product.timestamp).toLocaleString());
  productsList.push(product);
  await writeProductsDB(productsList);
  return res.json({
    product,
  });
};

const modifyProduct = async (req = request, res = response) => {
  const { id } = req.params;
  const { name, description, code, photo, price, stock } = req.body;
  const listProduct = await readProductsDB();
  const productToModify = listProduct.filter((product) => product.id == id)[0];
  if (productToModify == undefined) {
    return res.status(404).json({
      msg: `There is no product with id: ${id}`,
    });
  }
  const product = new Product(
    productToModify.id,
    Date.now(),
    name,
    description,
    code,
    photo,
    price,
    stock
  );
  const productListFiltered = listProduct.filter((product) => product.id != id);
  productListFiltered.push(product);
  await writeProductsDB(productListFiltered);
  return res.json({
    product,
  });
};

const deleteProduct = async (req = request, res = response) => {
  const { id } = req.params;
  const listProduct = await readProductsDB();
  const productToRemove = listProduct.filter((product) => product.id == id)[0];
  if (productToRemove == undefined) {
    return res.status(404).json({
      msg: `There is no product with id: ${id}`,
    });
  }
  const productListFiltered = listProduct.filter((product) => product.id != id);
  await writeProductsDB(productListFiltered);
  return res.json({
    msg: 'Product removed successfully',
  });
};

const readProductsDB = async () => {
  let reading = await fsp.readFile(productsDB, utf);
  if (reading == '') {
    reading = '[]';
  }
  return JSON.parse(reading);
};

const writeProductsDB = async (data) => {
  await fsp.writeFile(productsDB, JSON.stringify(data), utf);
};

module.exports = {
  getProducts,
  getProduct,
  addProduct,
  modifyProduct,
  deleteProduct,
};
