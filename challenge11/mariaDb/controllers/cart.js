const { response, request } = require('express');
const { v4: uuidV4 } = require('uuid');
const { mariaDBConfig } = require('../configs/mariaDB');
const knex = require('knex')(mariaDBConfig);

const Cart = require('../models/Cart');

const createCart = async (req = request, res = response) => {
  const cart = new Cart(uuidV4(), Date.now(), '[]');
  try {
    await knex.insert(cart).from('cart');

    res.status(201).json({
      msg: `The cart ${cart.id} has been created successfully`,
    });
  } catch (e) {
    console.log(e);
  }
};

const deleteCart = async (req = request, res = response) => {
  const { id } = req.params;
  try {
    const response = await knex.from('cart').where('id', '=', id).del();
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
    const cartDB = await knex.from('cart').select().where('id', '=', id);
    if (cartDB.length == 0) {
      return res.status(404).json({
        msg: `There is no cart with id ${id}`,
      });
    }

    // Convert the products into objects and push it to the cart
    const productsCart = JSON.parse(cartDB[0].product);

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
    const productDB = await knex
      .from('product')
      .select()
      .where('id', '=', id_product);
    if (productDB.length == 0) {
      return res.status(404).json({
        msg: `There is no product with id ${id_product}`,
      });
    }

    // Bring the cart
    const cartDB = await knex.from('cart').select().where('id', '=', id_cart);
    if (cartDB.length == 0) {
      return res.status(404).json({
        msg: `There is no cart with id ${id_cart}`,
      });
    }

    // Convert products to objects
    let productsCart = JSON.parse(cartDB[0].product);

    //Check if the product exists in the cart
    let exist = false;
    for (let product of productsCart) {
      if (product.id == productDB[0].id) {
        exist = true;
      }
    }

    // Add to cart (if it does not exist)
    if (!exist) {
      productsCart.push(productDB[0]);
    } else {
      return res.status(400).json({
        msg: 'The product is already in the cart',
      });
    }

    // Update Cart
    await knex
      .from('cart')
      .where('id', id_cart)
      .update('product', JSON.stringify(productsCart));

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
    const productDB = await knex
      .from('product')
      .select()
      .where('id', '=', id_product);
    if (productDB.length == 0) {
      return res.status(404).json({
        msg: `There is no product with id ${id_product}`,
      });
    }

    // Bring the cart
    const cartDB = await knex.from('cart').select().where('id', '=', id_cart);
    if (cartDB.length == 0) {
      return res.status(404).json({
        msg: `There is no cart with id ${id_cart}.`,
      });
    }

    // Convert products to objects
    let productsCart = JSON.parse(cartDB[0].product);

    // Check if the product exists in the cart
    let exist = false;
    for (let product of productsCart) {
      if (product.id == productDB[0].id) {
        exist = true;
      }
    }

    // Add to cart (if it does not exist)
    if (!exist) {
      return res.status(400).json({
        msg: 'The product does not exist in the cart',
      });
    } else {
      const productsFiltered = productsFiltered.filter(
        (product) => product.id != productDB[0].id
      );
      await knex
        .from('cart')
        .where('id', id_cart)
        .update('product', JSON.stringify(productsFiltered));
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
