const { buildSchema } = require('graphql');

const schema = buildSchema(`
    type Product {
        id:ID!
        timestamp: String
        name: String
        description: String
        photo: String
        price: Int
        stock: Int
    }
    input ProductInput {
        name: String!
        description: String!
        photo: String!
        price: Int!
        stock: Int!
    }
    input ProductEditInput {
        name: String
        description: String
        photo: String
        price: Int
        stock: Int
    }
    type Query {
        getProduct(id:ID!): Product
        getProducts: [Product]
    }
    type Mutation {
        addProduct(data: ProductInput): Product
        modifyProduct(id:ID!, data: ProductEditInput): Product
        deleteProduct(id:ID!): Product
    }   
`);

module.exports = schema;
