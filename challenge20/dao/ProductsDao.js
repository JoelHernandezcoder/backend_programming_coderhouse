/* eslint-disable no-unused-vars */
const CustomError = require('../errors/CustomError.js');

class ProductosDao {
  async getAll() {
    throw new CustomError(500, 'need to implement getAll!');
  }

  async getById(id) {
    throw new CustomError(500, 'need to implement getById!');
  }

  async add(prodNew) {
    throw new CustomError(500, 'need to implement add!');
  }

  async deleteById(id) {
    throw new CustomError(500, 'need to implement deleteById!');
  }

  async deleteAll() {
    throw new CustomError(500, 'need to implement deleteAll!');
  }

  async updateById(id, newProd) {
    throw new CustomError(500, 'need to implement updateById!');
  }
}

module.exports = ProductosDao;
