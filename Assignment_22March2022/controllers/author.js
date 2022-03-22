const {body, validationResult} = require('express-validator');
const Author = require('../models/author');
const getAuthor = (req, res) => {
  Author.find((err, author_list) => {
    if (err) {
      res.json(err);
    } else {
      res.json(author_list);
    }
  });
};
const createAuthor = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.json({status: 0, debug_data: errors});
  } else {
    console.log(req.body);
    let {first_name, last_name, dob, dod} = req.body;
    let authorObject = new Author({first_name, last_name, dob, dod});
    authorObject.save((error) => {
      if (error) {
        res.json(error);
      } else {
        res.json({status: 'Adding author details'});
      }
    });
  }
};
const deleteAuthor = (req, res) => {
  Author.findByIdAndDelete(req.params.id, function (err) {
    if (err) {
      res.json(err);
    } else {
      res.json({
        status: `author details with id as ${req.params.id} is removed`,
      });
    }
  });
};
module.exports = {getAuthor, createAuthor, deleteAuthor};
