const Config = {
  db: {
    name: 'my_database',
    collection: 'products',
    cnxStr: 'mongodb://localhost/',
    //projection: {_id:0, __v:0}
    projection: { __v: 0 },
  },
};

module.exports = Config;
