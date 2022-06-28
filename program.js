class Container {
  constructor(file) {
    this.file = file;
  }

  async save(product) {
    let products = [];
    const fs = require('fs');
    try {
      const content = await fs.promises.readFile(this.file, 'utf-8');
      products = JSON.parse(content);
    } catch {}
    product.id = this.readId(products) + 1;
    products.push(product);
    console.log('Saved Products: ' + JSON.stringify(product));
    try {
      await this.saveProducts(products);
    } catch (err) {
      console.log(`Error Saving File: ${err}`);
    }
  }

  async getById(number) {
    try {
      const products = await this.getAll();
      if (products != null) {
        const prod = products.find((prod) => prod.id == number);
        return prod;
      } else {
        console.log('There are no products');
        return null;
      }
    } catch (err) {
      console.log('There are no products');
      return null;
    }
  }

  async getAll() {
    const fs = require('fs');
    try {
      const content = await fs.promises.readFile(this.file, 'utf-8');
      const products = JSON.parse(content);
      return products;
    } catch (err) {
      console.log('There are no products');
      return null;
    }
  }

  async deleteById(number) {
    let products = [];
    const fs = require('fs');
    products = fs.readFile(this.file, 'utf-8', (error, content) => {
      if (error) {
        console.log('There are no products. Nothing to remove');
      } else {
        products = JSON.parse(content);
        const prod = products.find((prod) => prod.id == number);
        try {
          if (prod.length == 0) {
            console.log(`Product with ID ${number} not found`);
          } else {
            const i = products.indexOf(prod);
            console.log(`Index ${i}`);
            products.splice(i, 1);
            this.saveProducts(products);
            console.log(`Product with ID ${number} Removed!!!`);
          }
        } catch {
          console.log(`Product with ID ${number} not found`);
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
        console.log('Eliminated Products.');
      }
    });
  }

  readId(products) {
    let id = 0;
    products.map((prod) => {
      if (prod.id > id) {
        id = prod.id;
      }
    });
    return id;
  }

  async saveProducts(products) {
    const fs = require('fs');
    try {
      await fs.promises.writeFile(this.file, JSON.stringify(products));
      console.log('Saved Products');
    } catch (err) {
      console.log(`Error Saving File: ${err}`);
    }
  }
}

async function app() {
  const graphicCards = new Container('products.json');

  const geForce3090 = {
    title: 'GeForce RTX™ 3090 24G',
    price: 3650,
    thumbnail:
      'https://www.gigabyte.com/FileUpload/Global/WebPage/686/img/3.png',
  };
  await graphicCards.save(geForce3090);

  const geForce3080ti = {
    title: 'RTX™ 3080 Ti 12G ',
    price: 2460,
    thumbnail:
      'https://www.gigabyte.com/FileUpload/Global/WebPage/851/img/2.png',
  };
  await graphicCards.save(geForce3080ti);

  const geForce3080 = {
    title: 'RTX™ 3080 10G',
    price: 699,
    thumbnail:
      'https://www.gigabyte.com/FileUpload/Global/WebPage/857/img/5.png',
  };
  await graphicCards.save(geForce3080);

  const prod1 = await graphicCards.getById(2);
  console.log('Product Found: ' + JSON.stringify(prod1));

  const prod2 = await graphicCards.getAll();
  console.log('Product Set: ' + JSON.stringify(prod2));

  //graphicCards.deleteById(1);
  //graphicCards.deleteAll();
}

app();
