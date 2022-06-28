import express from 'express';
const routerProd = express.Router();
import Products from '../controllers/products.js';

routerProd.get('/:id', (req, res) => {
  const { ...rest } = req.params;
  const prod = new Products(`products.json`);
  const id = Number(rest.id);
  prod.getById(id, (p) => {
    if (p == undefined) {
      res.status(400).json({ error: 'Product not found' });
    } else {
      res.status(200).send(p);
    }
  });
});

routerProd.get('/', (req, res) => {
  const prod = new Products(`products.json`);
  prod.getAll((p) => {
    res.status(200).send(p);
  });
});

routerProd.post('/', (req, res) => {
  try {
    const prod = new Products(`products.json`);
    const { title, price, thumbnail } = req.body;
    const newProduct = {
      title,
      price,
      thumbnail,
    };
    prod.save(newProduct, (prod) => {
      res.status(200).send(prod);
    });
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

routerProd.put('/:id', (req, res) => {
  try {
    const prod = new Products(`products.json`);
    const newProduct = req.body;
    console.log(newProduct);
    prod.modi(newProduct, (prod) => {
      res.status(200).send(newProduct);
    });
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

routerProd.delete('/:id', (req, res) => {
  try {
    const { ...rest } = req.params;
    const prod = new Products(`products.json`);
    const id = Number(rest.id);
    prod.deleteById(id, (prod) => {
      res.status(200).send(prod);
    });
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

export default routerProd;
