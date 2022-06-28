import routerProd from './routes/products.js';
import routerUpload from './routes/uploadFile.js';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class App {
  constructor(PORT) {
    this.port = PORT;
    this.app = express();
  }
  listen() {
    this.app.listen(this.port);
  }
  start() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use('/api/products', routerProd);
    this.app.use('/api/upload', routerUpload);
    this.app.use('/static', express.static(path.resolve(__dirname, '/public')));
    this.app.use(
      '/uploads',
      express.static(path.resolve(__dirname, '/uploads'))
    );

    console.log(
      `🚀 Server listening & ready on http://localhost:${this.port} 🔥`
    );

    this.app.get('/', (req, res) => {
      res.sendFile(path.resolve(__dirname, './public/index.html'));
    });
  }
}

export default App;
