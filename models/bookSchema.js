const mongoose = require('mongoose');
const bookSchema= mongoose.Schema({
    title: String,
    author: String,
    gernre: String,
    blurb: String,
    isbn: Number,
    read: Boolean,
})
//third is the collection name typical to name it the same as collection hence 1st and 3rd same
module.exports.Book = mongoose.model('books', bookSchema, 'books')