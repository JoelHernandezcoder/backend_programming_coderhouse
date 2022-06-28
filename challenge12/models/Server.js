const express = require('express');
const { dbConnection } = require('../configs/mongoDb');
const dotenv = require('dotenv');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const mongoStore = require('connect-mongo');

dotenv.config();

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
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    this.app.use(
      session({
        store: mongoStore.create({
          mongoUrl: process.env.MONGO_URI,
          options: {
            userNewUrlParser: true,
            userUnifiedTopology: true,
          },
        }),
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false,
      })
    );
    this.app.get('/login', (req, res, next) => {
      const { user, password } = req.query;
      if (user === 'admin' && password === '123456') {
        req.session.login = true;
        res.status(200).json({
          msg: 'Welcome admin user',
        });
        console.log('👤 User admin connected');
      } else {
        res.status(401).json({
          msg: 'Access denied',
        });
      }
    });
    this.app.get('/logout', (req, res, next) => {
      req.session.destroy((err) => {
        if (!err) {
          res.status(200).json({
            msg: 'Bye bye admin user',
          });
          console.log('❌ User admin disconnected');
        } else {
          res.json(err);
        }
      });
    });
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
