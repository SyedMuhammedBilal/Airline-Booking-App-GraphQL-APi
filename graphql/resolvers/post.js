const Post = require('../../models/Post')
const checkAuth = require('../../utils/checkAuth.ts')
const { AuthenticationError } = require('apollo-server')

module.exports = {
    Query: {
      async getPosts() {
        try {
          const posts = await Post.find().sort({ createdAt: -1 });
          return posts;
        } catch (err) {
          throw new Error(err);
        }
      },
      async getPost(_, { postId }) {
        try{
          const post = await Post.findById(postId);

          if(post) {
            return post;
          } else {
            throw new Error('post not found')
          }
        } catch(err) {
          throw new Error(err) 
        }
      }
    },
    Mutation: {
       async createPost(_, { placeName, amount, persons, passport }, context) {
         const user = checkAuth(context);
         console.log(user);

         const newPost = new Post({
           placeName,
           amount,
           persons,
           passport,
           user: user.id,
           username: user.username,
           createdAt: new Date().toISOString()
         });

         const post = await newPost.save();

         return post
      },
      
    //   async createPost(_, {
    //     inputPost: {
    //       placeName, amount, persons, passport
    //     }
    // }, info) {

    //     const newPost = new Post({
    //         placeName, 
    //         amount, 
    //         persons,
    //         passport,
    //         createdAt: new Date().toISOString()
    //     });

    //     const post = await newPost.save();

    //     return post
    // }
      
      async deletePost(_, { postId }, context) {
        const user = context;

        try {
          const post = await Post.findById(postId)

          if(user.username === post.username) {
            await post.delete();
            return 'Post deleted successfully'
          } else {
            throw new AuthenticationError('action not allowed')
          } 
        } catch(err) {
            throw new Error(err)
          }
      }
    }  
};