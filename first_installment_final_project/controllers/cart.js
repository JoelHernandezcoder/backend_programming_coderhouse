const { response, request } = require('express');
const { v4: uuidV4 } = require('uuid');
const { promises: fsp } = require('fs');
const Cart = require('../models/Cart');

const cartsDB = './db/carts.txt';
const productsDB = './db/products.txt';
const utf = 'utf-8';

const createCart = async (req = request, res = response) => {
  const cartsList = await readCartsDB();
  const cart = new Cart(uuidV4(), Date.now(), []);
  cartsList.push(cart);
  writeCartsDB(cartsList);
  res.status(201).json({
    msg: `The cart id: ${cart.id} has been created successfully!!!`,
  });
};

const deleteCart = async (req = request, res = response) => {
  const { id } = req.params;
  const cartsList = await readCartsDB();
  const cartToDelete = cartsList.filter((cart) => cart.id == id)[0];
  if (cartToDelete == undefined) {
    return res.status(404).json({
      msg: `The cart with id: ${id} does not exist`,
    });
  }
  const cartsFilteredList = cartsList.filter((cart) => cart.id != id);
  await writeCartsDB(cartsFilteredList);
  return res.json({
    msg: 'Cart deleted successfully',
  });
};

const getProductsFromCart = async (req = request, res = response) => {
  const { id } = req.params;

  //Bring the cart to show the products
  const cartsList = await readCartsDB();
  const cartShowProducts = cartsList.filter((cart) => cart.id == id)[0];
  if (cartShowProducts == undefined) {
    return res.status(404).json({
      msg: `There is no cart with id: ${id}`,
    });
  }

  const products = cartShowProducts.product;

  res.json({
    products,
  });
};

const addProductToCart = async (req = request, res = response) => {
  const { id_cart, id_product } = req.params;

  //Bring the cart to modify
  const cartsList = await readCartsDB();
  const cartToModify = cartsList.filter((cart) => cart.id == id_cart)[0];
  if (cartToModify == undefined) {
    return res.status(404).json({
      msg: `There is no cart with id: ${id_cart}`,
    });
  }

  // Bring the cart to save
  const productsList = await readProductsDB();
  const productToAddToCart = productsList.filter(
    (product) => product.id == id_product
  )[0];
  if (productToAddToCart == undefined) {
    return res.status(404).json({
      msg: `There is no cart with id: ${id_product}`,
    });
  }

  // Validate that the product does not exist in the cart
  for (productInCart of cartToModify.product) {
    if (productInCart.id == productToAddToCart.id) {
      return res.status(404).json({
        msg: `The selected product is already in the cart`,
      });
    }
  }

  // Add the product
  cartToModify.product.push(productToAddToCart);

  // Save the cart in the DB
  const cartsListUpdated = cartsList.filter((cart) => cart.id != id_cart);
  cartsListUpdated.push(cartToModify);
  await writeCartsDB(cartsListUpdated);

  res.status(200).json({
    cartToModify,
  });
};

const removeProductFromCart = async (req = request, res = response) => {
  const { id_cart, id_product } = req.params;

  // Bring the chosen cart
  const cartsList = await readCartsDB();
  const cartToDeleteProduct = cartsList.filter((cart) => cart.id == id_cart)[0];
  if (cartToDeleteProduct == undefined) {
    return res.status(404).json({
      msg: `There is no cart with id ${id_cart}.`,
    });
  }

  // Separate the products.
  let productsCart = cartToDeleteProduct.product;

  // Validation to verify that the product exists in the cart
  if (!ProductExistsInCart(productsCart, id_product)) {
    return res.status(404).json({
      msg: `The product with id: ${id_product} does not exist in the cart id: ${id_cart}`,
    });
  }

  // Assign the new products (not deleted) to the cart.
  productsCart = productsCart.filter((product) => product.id != id_product);
  cartToDeleteProduct.product = productsCart;

  // Save the cart in the DB
  const cartsListUpdated = cartsList.filter((cart) => cart.id != id_cart);
  cartsListUpdated.push(cartToDeleteProduct);
  await writeCartsDB(cartsListUpdated);

  return res.status(200).json({
    cartToDeleteProduct,
  });
};

const readCartsDB = async () => {
  let reading = await fsp.readFile(cartsDB, utf);
  if (reading == '') {
    reading = '[]';
  }
  return JSON.parse(reading);
};

const writeCartsDB = async (data) => {
  await fsp.writeFile(cartsDB, JSON.stringify(data), utf);
};

const readProductsDB = async () => {
  let reading = await fsp.readFile(productsDB, utf);
  if (reading == '') {
    reading = '[]';
  }
  return JSON.parse(reading);
};

const ProductExistsInCart = (productsCart, productId) => {
  const find = productsCart.find((product) => product.id == productId);
  return find == undefined ? false : true;
};

module.exports = {
  createCart,
  deleteCart,
  addProductToCart,
  getProductsFromCart,
  removeProductFromCart,
};
