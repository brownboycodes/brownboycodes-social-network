const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    postTitle: {
      type: String,
      required: true,
    },
    postContent: {
      type: String,
      required: true,
    },
    postAuthor: {
      type: String,
      required: true,
    },
    datePosted: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
