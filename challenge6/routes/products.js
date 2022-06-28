import express from 'express';
const routerProd = express.Router();
import Products from '../controllers/products.js';

routerProd.get('/', (req, res) => {
  res.render('main', {
    upload: true,
  });
});

routerProd.get('/products', (req, res) => {
  res.render('main', {
    upload: false,
  });
});

routerProd.post('/products', (req, res) => {
  const { body } = req;
  const products = new Products(`products.json`);
  products.save(body, (prods) => {
    res.render('main', {
      prods,
      upload: false,
    });
  });
});

export default routerProd;
