import ApiProdRoutes from './routes/api/products.js';
import ApiUploadRoutes from './routes/api/uploadFile.js';
import ProdRoutes from './routes/products.js';
import Products from './controllers/products.js';

import express from 'express';
import http from 'http';
import { engine } from 'express-handlebars';
import { Server } from 'socket.io';

import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class App {
  constructor(PORT) {
    this.port = PORT;
    this.app = express();
    this.server = http.createServer(this.app);
    this.io = new Server(this.server, {
      cors: { origin: '*' },
    });
    this.messages = [];
  }
  listen() {
    this.server.listen(this.port);
  }
  start() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use('/api/products', ApiProdRoutes);
    this.app.use('/api/upload', ApiUploadRoutes);
    this.app.use('/', ProdRoutes);

    this.app.use(express.static('public'));
    this.app.use(
      '/uploads',
      express.static(path.resolve(__dirname, '/uploads'))
    );
    this.app.set('views', 'public');
    this.app.set('view engine', 'hbs');
    this.app.engine(
      'hbs',
      engine({
        extname: '.hbs',
        defaultLayout: 'index.hbs',
        layoutsDir: __dirname + '/public/layouts',
        partialsDir: __dirname + '/public/partials',
      })
    );
    console.log(
      `🔥 Server listening and ready on http://localhost:${this.port}`
    );

    this.io.on('connection', (socket) => {
      console.log('Connected User');
      socket.emit('Welcome', {
        msg: 'We are online to listen to you 😊',
      });

      socket.on('disconnect', () => {
        console.log('Offline user');
        socket.emit('Welcome', 'See you later 👋');
      });

      socket.on('notification', (data) => {
        console.log(`Received: ${data}`);
      });

      socket.on('requireProds', () => {
        const products = new Products(`products.json`);
        products.getAll((prods) => {
          this.io.sockets.emit('sendProds', prods);
        });
      });

      socket.on('deleteProd', (data) => {
        const products = new Products(`products.json`);
        products.deleteById(data.id, () => {
          products.getAll((prods) => {
            this.io.sockets.emit('sendProds', prods);
          });
        });
      });

      socket.on('modifyProd', (data) => {
        const products = new Products(`products.json`);
        products.modi(data, () => {
          products.getAll((prods) => {
            this.io.sockets.emit('sendProds', prods);
          });
        });
      });

      socket.on('messageFront', (data) => {
        this.messages.push({
          id: socket.id,
          us: data.us,
          mail: data.mail,
          message: data.message,
          fh: data.fh,
        });
        this.io.sockets.emit('messageBack', this.messages);
      });
    });
  }
}

export default App;
