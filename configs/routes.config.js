const express = require("express");
const router = express.Router();
const post = require("../controllers/posts.controller");

router.post("/posts", post.doFillJson);
router.get("/posts", post.list);
router.get("/posts/:id", post.detail);
router.patch("/posts/:id", post.doDetail);
router.delete("/posts/:id", post.delete);

module.exports = router;