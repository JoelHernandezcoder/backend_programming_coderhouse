const { Router } = require('express');
const auth = require('../middleware/adminMiddleware');
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
router.post('/', auth, addProduct);

// Update a product by its id (Only administrators)
router.put('/:id', auth, modifyProduct);

// Allows you to delete a product by its id (Administrators Only)
router.delete('/:id', auth, deleteProduct);

module.exports = router;
