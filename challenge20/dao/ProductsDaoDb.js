const ProductsDao = require('./ProductsDao.js');
const products = require('../models/Product.js');
const CustomError = require('../errors/CustomError.js');
const MyMongoClient = require('../db/DbClientMongo.js');
const Config = require('../config.js');

class ProductsDaoDb extends ProductsDao {
  constructor() {
    super();
    this.client = new MyMongoClient();
    this.client.connect();
    this.projection = Config.db.projection;
  }

  async getAll() {
    try {
      const Wanted = await products.find({}, this.projection).lean();
      return Wanted;
    } catch (err) {
      throw new CustomError(500, 'error getting all products', err);
    }
  }

  async getById(idWanted) {
    let wanted;
    try {
      wanted = await products.findOne({ _id: idWanted }, this.projection);
    } catch (err) {
      throw new CustomError(500, 'error when searching product by ID', err);
    }

    if (!wanted) {
      throw new CustomError(404, 'product not found with that ID', {
        id: idWanted,
      });
    }

    return [wanted];
  }

  async add(prodNew) {
    try {
      return await products.create(prodNew);
    } catch (error) {
      throw new CustomError(500, 'error creating a new product', error);
    }
  }

  async deleteById(idToDelete) {
    let result;
    try {
      result = await products.deleteOne({ _id: idToDelete });
    } catch (error) {
      throw new CustomError(500, `error deleting product`, error);
    }

    if (result.deletedCount == 0) {
      throw new CustomError(
        404,
        `there is no product to delete with id: ${idToDelete}`,
        {
          idToDelete,
        }
      );
    }
  }

  async deleteAll() {
    try {
      await products.deleteMany();
    } catch (error) {
      throw new CustomError(500, `error deleting all products`, error);
    }
  }

  async updateById(idToReplace, newProd) {
    let result;
    try {
      result = await products.findOneAndReplace(
        { _id: idToReplace },
        newProd,
        this.projection
      );
    } catch (error) {
      throw new CustomError(500, `error replacing the product`, error);
    }

    if (!result) {
      throw new CustomError(
        404,
        `not found to update a product with id: ${idToReplace}`,
        { idToReplace }
      );
    }

    return newProd;
  }
  exit() {
    this.client.disconnect();
  }
}

module.exports = ProductsDaoDb;
