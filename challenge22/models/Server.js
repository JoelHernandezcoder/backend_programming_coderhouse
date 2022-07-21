const cors = require('cors');
const express = require('express');
const { dbConnection } = require('../configs/mongoDb');
const { graphqlHTTP } = require('express-graphql');
const schema = require('../models/graphql.model.js');
const {
  getProduct,
  getProducts,
  addProduct,
  modifyProduct,
  deleteProduct,
} = require('../services/graphql.service.js');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.productsRoutePath = '/api/products';
    this.cartRoutePath = '/api/cart';

    this.connectDb();
    this.graphql();
    this.routes();
  }
  async connectDb() {
    await dbConnection();
  }

  graphql() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(
      '/graphql',
      graphqlHTTP({
        schema,
        rootValue: {
          getProduct,
          getProducts,
          addProduct,
          modifyProduct,
          deleteProduct,
        },
        graphiql: true,
      })
    );
  }

  routes() {
    this.app.use(this.cartRoutePath, require('../routes/cart'));
    this.app.use(this.productsRoutePath, require('../routes/products'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`🚀 Server started on port http://localhost:${this.port}`);
    });
  }
}

module.exports = Server;
