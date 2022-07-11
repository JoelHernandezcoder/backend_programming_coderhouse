const express = require('express');

const minimist = require('minimist');
const ProductsApi = require('../controllers/products');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.cartRoutePath = '/api/cart';
    this.notFoundRoutPath = '/*';

    this.middleware();
    this.routes();
    this.start();
  }

  async start() {
    const argv = minimist(process.argv.slice(2));
    const { cmd, id, name, price, stock } = argv;

    console.log('Instantiating the API');
    const productsApi = new ProductsApi();

    try {
      switch (cmd.toLowerCase()) {
        case 'search':
          console.log(cmd);
          console.log(await productsApi.search(id));
          break;

        case 'add':
          console.log(cmd);
          console.log(await productsApi.add({ name, price, stock }));
          break;

        case 'replace':
          console.log(cmd);
          console.log(await productsApi.replace(id, { name, price, stock }));
          break;

        case 'delete':
          console.log(cmd);
          await productsApi.delete(id);
          break;

        default:
          console.log('invalid command:', cmd);
      }
    } catch (error) {
      console.log(error);
    }

    productsApi.exit();
  }

  middleware() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(express.static('public'));
  }

  routes() {
    this.app.use(this.cartRoutePath, require('../routes/cart'));
    this.app.use(this.notFoundRoutPath, require('../routes/notFound'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`🚀 Server started on port http://localhost:${this.port}`);
    });
  }
}

module.exports = Server;
