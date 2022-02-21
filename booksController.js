const createError = require("http-errors");
const { MongoClient, ObjectId } = require("mongodb");
const { Book } = require("./models/bookSchema");

exports.index = function (req, res) {
  Book.find().then((books) => res.send(books));
};

exports.showId = function (req, res, next) {
  Book.findOne({ _id: ObjectId(req.params.id) }).then((item) => {
    if (!item) next(createError(404, "no book with that id is in the list"));
    if (item) res.send(item);
  });
};

exports.showTitle = function (req, res, next) {
  Book.findOne({ title: req.params.title }).then((item) => {
    if (!item) next(createError(404, "no book with that title is in the list"));
    if (item) res.send(item);
  });
};

exports.showISBN = function (req, res, next) {
  Book.findOne({ isbn: req.params.isbn }).then((item) => {
    if (!item) next(createError(404, "no book with that isbn is in the list"));
    if (item) res.send(item);
  });
};

exports.showAuthor = function (req, res, next) {
  Book.find({ author: req.params.author }).then((items) => {
    if (!items)
      next(createError(404, "no books by that author are on the list"));
    if (items) res.send(items);
  });
};
exports.showGenre = function (req, res, next) {
  Book.find({ genre: req.params.genre }).then((items) => {
    if (!items) next(createError(404, "no books of that genre are on the list"));
    if (items) res.send(items);
  });
};

exports.showReadStatus = function (req, res, next) {
  
  if (req.params.read == "false") {
    Book.where( { read: false } )
    .then((items) => {
        res.send(items);
      })
    } else if (req.params.read == "true") {
      Book.where( { read: true } )
    .then((items) => {
        res.send(items);
      })
    }else{
      next(createError(400, "No such read status"));
    }}


exports.create = function (req, res, next) {
  const newBook = new Book({
    title: req.body.title,
    author: req.body.author,
    gernre: req.body.genre,
    blurb: req.body.blurb,
    isbn: req.body.isbn,
    read: req.body.read,
  });
  newBook.save().then(res.send({ result: true }));
};

exports.delete = function (req, res, next) {
  Book.deleteOne({ _id: ObjectId(req.params.id) }).then((response) => {
    if (response.deletedCount > 0) {
      return res.send({ result: true });
    }
    return next(createError(404, "no todo with that id"));
  });
};

exports.update = function (req, res, next) {
  Book.findOne({ _id: ObjectId(req.params.id) }).then((item) => {
    if (!item) {
      return next(createError(404, "no todo with that id"));
    }
    (item.title = req.body.title),
      (item.author = req.body.author),
      (item.genre = req.body.genre),
      (item.blurb = req.body.blurb),
      (item.isbn = req.body.isbn),
      (item.read = req.body.read),
      item.save().then(() => {
        res.send({ result: true });
      });
  });
};
