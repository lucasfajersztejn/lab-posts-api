const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    title: {
      type: String,
      min: [5, "Title needs 5 characters minimum"],
      required: "Title is required",
    },
    text: {
      type: String,
      min: [5, "Text needs 5 characters minimum"],
      required: "Text is required",
    },
    author: {
      type: String,
      required: "Author is required",
    }
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
)

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
