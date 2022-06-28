const { response, request } = require('express');
const { v4: uuidV4 } = require('uuid');
const Product = require('../models/Product.js');
const Cart = require('../models/Cart.js');

const createCart = async (req = request, res = response) => {
  const cart = {
    id: uuidV4(),
    timestamp: Date.now(),
  };
  try {
    await Cart.create(cart);
    res.status(201).json({
      msg: `The cart whit id ${cart.id} has been created successfully`,
    });
  } catch (e) {
    console.log(e);
  }
};

const deleteCart = async (req = request, res = response) => {
  const { id } = req.params;
  try {
    const response = await Cart.deleteOne({ id: id });
    if (response == 0) {
      return res.status(404).json({
        msg: `There is no cart with id ${id}`,
      });
    }
    res.status(200).json({
      msg: 'Cart deleted successfully!',
    });
  } catch (e) {
    console.log(e);
  }
};

const getProductsFromCart = async (req = request, res = response) => {
  const { id } = req.params;

  // Check if the cart exists
  try {
    const cartDB = await Cart.findOne({ id: id });

    if (cartDB == null) {
      return res.status(404).json({
        msg: `There is no cart with id ${id}`,
      });
    }

    // Push it to the cart
    const productsCart = cartDB.product;

    res.status(200).json({
      productsCart,
    });
  } catch (e) {
    console.log(e);
  }
};

const addProductToCart = async (req = request, res = response) => {
  try {
    const { id_cart, id_product } = req.params;

    // Bring the product to store
    const productDB = await Product.findOne({ id: id_product });
    if (productDB == null) {
      return res.status(404).json({
        msg: `There is no product with id ${id_product}`,
      });
    }

    // Bring the cart
    const cartDB = await Cart.findOne({ id: id_cart });
    if (cartDB == null) {
      return res.status(404).json({
        msg: `There is no cart with id ${id_cart}`,
      });
    }

    let productsCart = cartDB.product;

    //Check if the product exists in the cart
    let exist = false;
    for (let product of productsCart) {
      if (product.id == productDB.id) {
        exist = true;
      }
    }
    // Add to cart (if it does not exist)
    if (!exist) {
      productsCart.push(productDB);
    } else {
      return res.status(400).json({
        msg: 'The product is already in the cart',
      });
    }

    // Update Cart
    await Cart.updateOne({ id: id_cart }, { product: productsCart });
    res.status(200).json({
      productsCart,
    });
  } catch (e) {
    console.log(e);
  }
};

const removeProductFromCart = async (req = request, res = response) => {
  const { id_cart, id_product } = req.params;

  try {
    // Bring the product to store
    const productDB = await Product.findOne({ id: id_product });
    if (productDB == null) {
      return res.status(404).json({
        msg: `There is no product with id ${id_product}`,
      });
    }

    // Bring the cart
    const cartDB = await Cart.findOne({ id: id_cart });
    if (cartDB == null) {
      return res.status(404).json({
        msg: `There is no cart with id ${id_cart}.`,
      });
    }

    // Convert products to objects
    let productsCart = cartDB.product;

    // Check if the product exists in the cart
    let exist = false;
    for (let product of productsCart) {
      if (product.id == productDB.id) {
        exist = true;
      }
    }

    // Add to cart (if it does not exist)
    if (!exist) {
      return res.status(400).json({
        msg: 'The product does not exist in the cart',
      });
    } else {
      const productsFiltered = productsCart.filter(
        (product) => product.id != productDB.id
      );
      await Cart.updateOne({ id: id_cart }, { product: productsFiltered });
    }

    res.status(200).json({
      msg: 'Product removed successfully!',
    });
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  createCart,
  deleteCart,
  addProductToCart,
  getProductsFromCart,
  removeProductFromCart,
};
