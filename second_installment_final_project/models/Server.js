const express = require('express');
const { dbConnection } = require('../configs/mongoDb');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.productsRoutePath = '/api/products';
    this.cartRoutePath = '/api/cart';
    this.notFoundRoutPath = '/*';
    this.connectDb();
    this.middleware();
    this.routes();
  }
  async connectDb() {
    await dbConnection();
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
