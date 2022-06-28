const express = require('express');
const SQLite = require('../db/SQLite');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.productsRoutePath = '/api/products';
    this.cartRoutePath = '/api/cart';
    this.notFoundRoutPath = '/*';
    this.db();
    this.middleware();
    this.routes();
  }

  async db() {
    await SQLite.initialize();
  }

  middleware() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(express.static('public'));
  }

  routes() {
    this.app.use(this.cartRoutePath, require('../routes/cart'));
    this.app.use(this.productsRoutePath, require('../routes/products'));
    this.app.use(this.notFoundRoutPath, require('../routes/notFound'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`🚀 Server started on port http://localhost:${this.port}`);
    });
  }
}

module.exports = Server;
