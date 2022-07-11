const ProductsDaoDB = require('../dao/ProductsDaoDb.js');
//const ProductsDaoDB = require('../dao/ProductsDaoFile.js');

class ProductsApi {
  constructor() {
    this.productsDao = new ProductsDaoDB();
  }

  async add(prodToAdd) {
    const prodAdded = await this.productsDao.add(prodToAdd);
    return prodAdded;
  }

  async search(id) {
    let productos;
    if (id) {
      productos = await this.productsDao.getById(id);
    } else {
      productos = await this.productsDao.getAll();
    }
    return productos;
  }

  async delete(id) {
    if (id) {
      await this.productsDao.deleteById(id);
    } else {
      await this.productsDao.deleteAll();
    }
  }

  async replace(id, prodToReplace) {
    const replacedProduct = await this.productsDao.updateById(
      id,
      prodToReplace
    );
    return replacedProduct;
  }

  exit() {
    this.productsDao.exit();
  }
}

module.exports = ProductsApi;
