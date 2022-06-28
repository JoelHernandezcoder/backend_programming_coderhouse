const { faker } = require('@faker-js/faker');

const getAll = async (req = request, res = response) => {
  try {
    const response = [];
    for (let i = 1; i <= 5; i++) {
      const prod = {
        id: faker.finance.account(8),
        timestamp: faker.date.past(10),
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        photo: faker.image.fashion(),
        price: faker.commerce.price(),
        stock: faker.commerce.price(),
      };
      response.push(prod);
    }
    res.status(200).json(response);
  } catch (err) {
    res(err);
  }
};

module.exports = { getAll };
