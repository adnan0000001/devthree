const express = require("express");
const router = express.Router();
const Articles = require("../models/articles");

// Request get all Article
router.get("/", (req, res) => {
  Articles.find()
    .then((article) => res.json(article))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

// Request add new articles
router.post("/add", (req, res) => {
  const newArticle = new Articles({
    title: req.body.title,
    article: req.body.article,
    authorname: req.body.authorname,
  });

  newArticle
    .save()
    .then(() => res.json("New Article Post Sucessfully"))
    .catch((err) => res.status(400).json(`Error ${err}`));
});

// Request Find Article by ID
router.get("/:id", (req, res) => {
  Articles.findById(req.params.id)
    .then((item) => res.json(item))
    .catch((err) => res.status(400).json(`Error ${err}`));
});

// Request Find Article by ID AND UPDATE
router.put("/update/:id", (req, res) => {
  Articles.findById(req.params.id)
    .then((article) => {
      article.title = req.body.title;
      article.article = req.body.article;
      article.authorname = req.body.authorname;

      article
        .save()
        .then(() => res.json("The Article is Updated Sucessfully"))
        .catch((err) => res.status(400).json(`Error ${err}`));
    })
    .catch((err) => res.status(400).json(`Error ${err}`));
});

// Request Find Article by ID and DELETE
router.delete("/:id", (req, res) => {
  Articles.findByIdAndDelete(req.params.id)
    .then(() => res.json("The Article is Deleted"))
    .catch((err) => res.status(400).json(`Error ${err}`));
});

module.exports = router;
