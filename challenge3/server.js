const express = require('express');
const app = express();

class Container {
  constructor(file) {
    this.file = file;
  }
  async save(product) {
    let products = [];
    const fs = require('fs');
    try {
      const content = await fs.promises.readFile('products.txt', 'utf-8');
      products = JSON.parse(content);
      this.saveProducts(products);
    } catch (err) {
      console.log(`Error Saving File: ${err}`);
    }
  }

  async saveProducts(products) {
    const fs = require('fs');
    try {
      await fs.promises.writeFile('products.json', JSON.stringify(products));
      console.log('Saved Products');
    } catch (err) {
      console.log(`Error Saving File: ${err}`);
    }
  }
}

async function Process() {
  const fs = require('fs');
  const graphicCards = new Container('products.json');
  const fileTxt = await fs.promises.readFile('./products.txt', 'utf-8');
  const fileJ = JSON.parse(fileTxt);
  for (let object of fileJ) {
    await graphicCards.save(object);
  }
}

async function random() {
  const fs = require('fs');
  try {
    const random = new Container('random.json');
    const productsTxt = await fs.promises.readFile('./products.txt', 'utf-8');
    const productsJ = JSON.parse(productsTxt);
    const randomProduct =
      productsJ[Math.floor(Math.random() * productsJ.length)];
    await random.save(randomProduct);
    await fs.promises.writeFile('random.json', JSON.stringify(randomProduct));
    console.log('Random generate');
  } catch (error) {
    console.log(error);
  }
}

Process();
random();

app.get('/products', (req, res) => {
  res.sendFile(__dirname + '/products.json');
});
app.get('/random', (req, res) => {
  res.sendFile(__dirname + '/random.json');
});

const port = 8080;
const server = app.listen(port, () => {
  console.log(`🔥 server started at http://localHost:${port}🔥`);
});

server.on('error', (error) => console.log(error));
