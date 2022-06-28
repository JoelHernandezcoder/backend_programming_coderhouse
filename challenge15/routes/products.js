const { Router } = require('express');
const adminMiddleware = require('../middleware/adminMiddleware');
const router = Router();

const {
  getProducts,
  getProduct,
  addProduct,
  modifyProduct,
  deleteProduct,
} = require('../controllers/products');

// Allows you to list all products
router.get('/', getProducts);

// Allows listing a product by ID
router.get('/:id', getProduct);

// Allows you to add a product (Only administrators)
router.post('/', adminMiddleware, addProduct);

// Update a product by its id (Only administrators)
router.put('/:id', adminMiddleware, modifyProduct);

// Allows you to delete a product by its id (Administrators Only)
router.delete('/:id', adminMiddleware, deleteProduct);

module.exports = router;
