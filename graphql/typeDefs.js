const { gql } = require('apollo-server')

module.exports = gql`
  type Post {
    id: ID!
    amount: String!
    placeName: String!
    username: String!
    passport: String!
    persons: Int!
    createdAt: String!
  }
  type User {
    id: ID!
    email: String!
    username: String!
    token: String!
    createdAt: String!
  }
  input RegisterInput {
    username: String!
    email: String!
    password: String!
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
        placeName: String!,
        amount: String!,
        passport: String!,
        persons: Int!  
      ): Post!
      deletePost(postId: ID!): String!
  }
`;