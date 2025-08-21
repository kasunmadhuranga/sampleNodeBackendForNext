export const typeDefs = `#graphql
  type Product {
    id: ID!
    name: String!
    description: String
    price: Float!
    stock: Int!
    category: String
    image_url: String
    created_at: String!
    updated_at: String!
  }

  input ProductInput {
    name: String!
    description: String
    price: Float!
    stock: Int = 0
    category: String
    image_url: String
  }

  input ProductUpdateInput {
    name: String
    description: String
    price: Float
    stock: Int
    category: String
    image_url: String
  }

  type Query {
    products: [Product!]!
    product(id: ID!): Product
  }

  type Mutation {
    createProduct(input: ProductInput!): Product!
    updateProduct(id: ID!, input: ProductUpdateInput!): Product!
    deleteProduct(id: ID!): Boolean!
  }
`;