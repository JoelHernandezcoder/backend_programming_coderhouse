const { Router } = require('express');

const {
  getNotFound,
  postNotFound,
  putNotFound,
  deleteNotFound,
} = require('../controllers/notFound');

const router = Router();

// Create a new Cart
router.get('/*', getNotFound);

// Delete a Cart by ID
router.post('/*', postNotFound);

// List Products in a cart (id Cart )
router.put('/*', putNotFound);

// Add Products to a Cart ( Product id && Cart id )
router.delete('/*', deleteNotFound);

module.exports = router;
