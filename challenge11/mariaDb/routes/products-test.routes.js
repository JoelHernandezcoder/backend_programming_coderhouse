const { Router } = require('express');

const { getAll } = require('../controllers/products-test');

const router = Router();

// Allows you to list five products
router.get('/', getAll);

module.exports = router;
