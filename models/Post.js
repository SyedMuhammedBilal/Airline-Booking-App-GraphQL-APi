const { model, Schema } = require('mongoose');

const postSchema = new Schema({
  amount: String,
  placeName: String,
  passport: String,
  persons: Number,
  username: String,
  createdAt: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  }
});

module.exports = model('Post', postSchema);