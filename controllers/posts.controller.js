const mongoose = require("mongoose");
const Post = require("../models/post.model");
const { authenticate } = require("../middlewares/auth.middleware");

module.exports.doFillJson = async (req, res, next) => {
  authenticate(req, res, async () => {
    try{
      const createMovie = await Post.create(req.body)
      res.status(201).json(createMovie);
    } catch(error) {
      if (error instanceof mongoose.Error.ValidationError) {
        res.status(400).json(error.errors);
      } else {
        next(error);
      }
    }
  });
};

module.exports.list = async (req, res, next) => {
  authenticate(req, res, async () => {
    try {
      const posts = await Post.find();
      res.status(200).json(posts);
    } catch(error) {
      next(error);
    }
  });
};

module.exports.detail = async (req, res, next) => {
  authenticate(req, res, async () => {
    try {
      const { id } = req.params
      const movie = await Post.findById(id);
      if (!movie) {
        res.status(404).json({"movie": "not_found"})
      } else {
        res.status(200).json(movie);
      }
    } catch(error) {
      next(error);
    }
  });
};

module.exports.doDetail = async (req, res, next) => {
  authenticate(req, res, async () => {
    try {
      const { id } = req.params;
      const { title, text, author } = req.body;

      if (!title && !text && !author) {
        res.status(400).json({ message: "title, text and author are required"});
      }

      const movie = await Post.findByIdAndUpdate(id, {title, text, author}, {new: true});
      
      if (!movie) {
        res.status(404).json({ message: "movie not founded"});
      } else {
        res.status(200).json(movie);
      }

    } catch(error) {
      next(error);
    }
  });
};

module.exports.delete = async (req, res, next) => {
  authenticate(req, res, async () => {
    try {
      const { id } = req.params;
      const deletedMovie = await Post.findByIdAndDelete(id);

      if (!deletedMovie) {
        res.status(404).json({ message: "There is no movie width that Id" });
      } else {
        res.status(204).json({ message: "The movie was deleted" });
      }

    } catch(error) {
      next(error);
    }
  });
};