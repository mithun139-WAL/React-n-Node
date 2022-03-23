const Author = require('../models/authors');
const getAuthors = (req, res) => {
  Author.find((error, authors_list) => {
    if (error) {
      res.json(error);
    } else {
      res.json(authors_list);
    }
  });
};
const createAuthors = (req, res) => {
  const authorObj = new Author(req.body);
  authorObj.save((err) => {
    if (err) {
      res.json(err);
    } else {
      res.json({status: 'Author added successfully'});
    }
  });
};
const deleteAuthors = (req, res) => {
  Author.findByIdAndDelete(req.params.id, req.body, function (err) {
    console.log(req.body);
    if (err) {
      res.json(err);
    } else {
      res.json({status: `Author with id as ${req.params.id} is removed`});
    }
  });
};

const updateAuthors = (req, res) => {
  const updateOb = req.body;
  Author.findByIdAndUpdate(req.params.id, updateOb, (error) => {
    if (error) {
      res.json(error);
    } else {
      res.json({status: `Author with _id ${req.params.id} is updated`});
    }
  });
};
module.exports = {getAuthors, createAuthors, deleteAuthors, updateAuthors};
