const Book = require('../models/books');
const getBooks = (req, res) => {
  Book.find((err, books_list) => {
    if (err) {
      res.json(err);
    } else {
      res.json(books_list);
    }
  });
};
const createBooks = (req, res) => {
  bookObj = new Book(req.body);
  bookObj.save((err) => {
    if (err) {
      res.json(err);
    } else {
      res.json('Book Added successfully');
    }
  });
};
const editBooks = (req, res) => {
  const updateOb = req.body;
  Book.findByIdAndUpdate(req.params.id, updateOb, function (err) {
    if (err) {
      res.json(err);
    } else {
      res.json(`Book with id as ${req.params.id} is updated`);
    }
  });
};
const getBookWithAuthor = (req, res) => {
  Book.find()
    .populate('author')
    .exec((err, books_list) => {
      if (err) {
        res.json(err);
      } else {
        res.json({status: 1, data: books_list});
      }
    });
};
const getBookWithCondition = (req, res) => {
  Book.find({name: req.params.name}).exec((err, books_list) => {
    if (err) {
      res.json(err);
    } else {
      res.json({status: 1, data: books_list});
    }
  });
};
const getBookWithAuthorAndCategory = (req, res) => {
  Book.find()
    .populate('author')
    .populate('category')
    .exec((err, books_list) => {
      if (err) {
        res.json(err);
      } else {
        res.json(books_list);
      }
    });
};
const getBookWithId = (req, res) => {
  Book.findById(req.params.id).exec((err, book) => {
    if (err) {
      res.json(err);
    } else {
      res.json(book);
    }
  });
};
module.exports = {
  getBooks,
  getBookWithAuthor,
  getBookWithCondition,
  createBooks,
  getBookWithAuthorAndCategory,
  editBooks,
  getBookWithId,
};
