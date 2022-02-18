const express = require("express");
const router = express.Router();
const books = require("./booksController");

router.get("/", books.index);

router.get("/id/:id", books.showId);
router.get("/title/:title", books.showTitle);
router.get("/isbn/:isbn", books.showISBN);
router.get("/author/:author", books.showAuthor);
router.get("/genre/:genre", books.showGenre);
router.get("/read/:read", books.showReadStatus);

router.post("/create", books.create);

router.delete("/:id", books.delete);

router.put("/:id", books.update);

module.exports = router
