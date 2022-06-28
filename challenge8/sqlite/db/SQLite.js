const { SQLiteConfig } = require('../configs/SQLite');

const initialize = async () => {
  const knex = require('knex')(SQLiteConfig);
  console.log('DataBase connection successful!');

  // Create Products table
  if (!(await knex.schema.hasTable('product'))) {
    knex.schema
      .createTable('product', (table) => {
        table.string('id');
        table.string('timestamp');
        table.string('name');
        table.string('description');
        table.string('code');
        table.string('photo');
        table.float('price');
        table.integer('stock');
      })
      .then(() => {
        console.log('Table created successfully');
      })
      .catch((err) => {
        console.log(err);
        throw err;
      })
      .finally(() => {
        knex.destroy();
      });
  }

  // Create Cart Table
  if (!(await knex.schema.hasTable('cart'))) {
    knex.schema
      .createTable('cart', (table) => {
        table.string('id');
        table.string('timestamp');
        table.json('product');
      })
      .then(() => {
        console.log('Table created successfully');
      })
      .catch((err) => {
        console.log(err);
        throw err;
      })
      .finally(() => {
        knex.destroy();
      });
  }
};

module.exports = {
  initialize,
};
