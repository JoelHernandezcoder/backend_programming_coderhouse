const { Router } = require('express');

const router = Router();

const {
  createCart,
  deleteCart,
  addProductToCart,
  getProductsFromCart,
  removeProductFromCart,
} = require('../controllers/cart.js');

// Create a new Cart
router.post('/', createCart);

// Delete a Cart by ID
router.delete('/:id', deleteCart);

// List Products in a cart (id Cart )
router.get('/:id/products', getProductsFromCart);

// Add Products to a Cart ( Product id && Cart id )
router.post('/:id_cart/products/:id_product', addProductToCart);

// Delete a product from a cart ( Product id && Cart id)
router.delete('/:id_cart/products/:id_product', removeProductFromCart);

module.exports = router;
