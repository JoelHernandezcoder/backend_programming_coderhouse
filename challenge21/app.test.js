const { expect } = require('chai');
const request = require('supertest');
const url = 'http://localhost:8080';

describe('Add a product: ', () => {
  it('should add product', async () => {
    let response = await request(url).post('/api/products').send({
      name: 'GeForce RTX™ 3090 24G',
      description: 'description',
      photo: 'https://www.gigabyte.com/FileUpload/Global/WebPage/686/img/3.png',
      price: 3650,
      stock: 10,
    });
    console.log('Body Response', response.body);
    expect(response.status).to.equal(200);
  });
});

describe('Get all products: ', () => {
  it('should get all products', async () => {
    let response = await request(url).get('/api/products');
    console.log('Body Response', response.body);
    expect(response.status).to.equal(200);
  });
});

//please paste the id of the product you want to delete
//describe('Remove a product: ', () => {
//  it('should remove product', async () => {
//    let response = await request(url).delete('/api/products/id');
//    console.log('Body Response', response.body);
//    expect(response.status).to.equal(200);
//  });
//});

//describe('Update a product: ', () => {
//  it('should update product', async () => {
//    let response = await request(url).put('/api/products/id').send({
//      name: 'GeForce RTX™ 3090 24G',
//      description: 'description',
//      photo: 'https://www.gigabyte.com/FileUpload/Global/WebPage/686/img/3.png',
//      price: 1000000,
//      stock: 10,
//    });
//    console.log('Body Response', response.body);
//    expect(response.status).to.equal(200);
//  });
//})
