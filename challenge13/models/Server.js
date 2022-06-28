const express = require('express');
const { dbConnection } = require('../configs/mongoDb.js');
const path = require('path');
const { engine } = require('express-handlebars');
const session = require('express-session');
const AuthRouter = require('../routes/auth.router.js');
const passport = require('../utils/passport.util.js');

require('../configs/mongoDb.js');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.middleware();
    this.productsRoutePath = '/api/products';
    this.cartRoutePath = '/api/cart';
    this.notFoundRoutPath = '/*';
    this.signup = '/signup';
    this.login = '/login';
    this.logout = '/logout';
    this.connectDb();
    this.routes();
  }

  async connectDb() {
    await dbConnection();
  }

  middleware() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.set('views');
    this.app.set('view engine', 'hbs');
    this.app.engine(
      'hbs',
      engine({
        extended: '.hbs',
        defaultLayout: 'main.hbs',
        layoutsDir: path.resolve() + '/views/layouts',
      })
    );
    this.app.use(
      session({
        secret: process.env.SECRET,
        cookie: {
          maxAge: Number(process.env.EXPIRE),
        },
        rolling: true,
        resave: true,
        saveUninitialized: true,
      })
    );
    this.app.use(passport.initialize());
    this.app.use(passport.session());
    this.app.use('/', AuthRouter);
  }

  routes() {
    this.app.use(this.cartRoutePath, require('../routes/cart'));
    this.app.use(this.productsRoutePath, require('../routes/products'));
    this.app.use(this.notFoundRoutPath, require('../routes/notFound'));
    this.app.use(this.signup, require('../routes/auth.router'));
    this.app.use(this.login, require('../routes/auth.router'));
    this.app.use(this.logout, require('../routes/auth.router'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`🚀 Server started on port http://localhost:${this.port}`);
    });
  }
}

module.exports = Server;
