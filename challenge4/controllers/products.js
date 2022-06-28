import fs from 'fs';

class Products {
  constructor(json) {
    this.file = json;
  }

  save(product, res) {
    let products = [];
    products = fs.readFile(this.file, 'utf-8', (error, content) => {
      if (error) {
        console.log('There are no products');
        product.id = 1;
        products = [];
        products.push(product);
        this.saveProducts(products);
        res(product);
      } else {
        try {
          products = JSON.parse(content);
          product.id = this.readMaxId(products) + 1;
          products.push(product);
          this.saveProducts(products);
          res(product);
        } catch {}
      }
    });
  }
  modi(product, res) {
    let products = [];
    products = fs.readFile(this.file, 'utf-8', (error, content) => {
      if (error) {
        res('There are no products');
        return true;
      } else {
        products = JSON.parse(content);
        for (let i of products) {
          if (i.id == product.id) {
            i.title = product.title;
            i.price = product.price;
            i.thumbnail = product.thumbnail;
          }
        }
        this.saveProducts(products);
        res(product);
      }
    });
  }
  readMaxId(products) {
    let id = 1;
    products.map((prod) => {
      if (prod.id > id) {
        id = prod.id;
      }
    });
    return id;
  }
  saveProducts(products) {
    fs.writeFile(this.file, JSON.stringify(products), (error) => {
      if (error) {
        console.log('Error saving file');
      } else {
        return true;
      }
    });
  }

  getById(Number, product) {
    let products = [];
    products = fs.readFile(this.file, 'utf-8', (error, content) => {
      if (error) {
        console.log('There are no products');
        product(null);
      } else {
        products = JSON.parse(content);
        const prod = products.find((prod) => prod.id == Number);
        product(prod);
      }
    });
  }
  getAll(all) {
    let products = [];
    products = fs.readFile(this.file, 'utf-8', (error, content) => {
      if (error) {
        console.log('There are no products');
        all(null);
      } else {
        products = JSON.parse(content);
        all(products);
      }
    });
  }

  deleteById(Number, res) {
    let products = [];
    products = fs.readFile(this.file, 'utf-8', (error, content) => {
      if (error) {
        res('There are no products to delete');
      } else {
        products = JSON.parse(content);
        const prod = products.find((prod) => prod.id == Number);
        try {
          if (prod.length == 0) {
            res(`The product with id ${Number} was not found`);
          } else {
            const i = products.indexOf(prod);
            console.log(`Index ${i}`);
            products.splice(i, 1);
            this.saveProducts(products);
            res(`Product whit id ${Number} Removed!!!!`);
          }
        } catch {
          res(`The product with id ${Number} was not found`);
        }
      }
    });
  }

  deleteAll() {
    const fs = require('fs');
    fs.unlink(this.file, (error) => {
      if (error) {
        console.log('Products could not be removed');
      } else {
        console.log('Removed Products');
      }
    });
  }
}

export default Products;
