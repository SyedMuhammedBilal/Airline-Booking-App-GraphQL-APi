const { gql } = require('apollo-server')

module.exports = gql`
  type Post {
    id: ID!
    amount: String!
    placeName: String!
    passport: String!
    persons: String!
    username: String!
    createdAt: String!
  }
  type User {
    id: ID!
    email: String!
    username: String!
    password: String!
    token: String!
    createdAt: String!
  }
  input RegisterInput {
    username: String!
    email: String!
    password: String!
  }
  input InputPost {
    amount: String!
    placeName: String!
    passport: String!
    persons: String!
  }
  type Query {
    getPosts: [Post]
    getPost(postId: ID!): Post
  }
  type Mutation {
      register(registerInput: RegisterInput): User!
      login(
        email: String!,
        password: String!
      ): User!
      createPost(
        placeName: String! 
        amount: String!
        persons: String! 
        passport: String!
      ): Post!
      deletePost(postId: ID!): String!
  }
`;