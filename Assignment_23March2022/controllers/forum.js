const {body, validationResult} = require('express-validator');
const Forum = require('../models/forum');
const getForum = (req, res) => {
  Forum.find((err, forum_list) => {
    if (err) {
      res.json(err);
    } else {
      res.json(forum_list);
    }
  });
};
const createForum = [
  body('author')
    .trim()
    .isAlphanumeric()
    .withMessage(
      'Only alphabets and numbers are allowed. No special characters are allowed'
    ),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({status: 0, debug_data: errors});
    } else {
      console.log(req.body);
      let {title, author, date_of_creation, body} = req.body;
      let forumObject = new Forum({title, author, date_of_creation, body});
      forumObject.save((error) => {
        if (error) {
          res.json(error);
        } else {
          res.json({status: 'Adding forum details'});
        }
      });
    }
  },
];
const deleteForum = (req, res) => {
  Forum.findByIdAndDelete(req.params.id, function (err) {
    if (err) {
      res.json(err);
    } else {
      res.json({status: `Forum with id as ${req.params.id} is removed`});
    }
  });
};
const updateForum = [
  body('title')
    .trim()
    .isLength({min: 10, max: 100})
    .withMessage(
      'For title, min length should be 10 and max length should be 100 characters'
    ),
  body('author')
    .trim()
    .isAlphanumeric()
    .withMessage(
      'Only alphabets and numbers are allowed. No special characters are allowed'
    )
    .isLength({min: 5, max: 50})
    .withMessage(
      'For author, min length should be 5 and max length should be 50 alphanumeric characters'
    ),
  body('body')
    .trim()
    .isLength({min: 50, max: 500})
    .withMessage(
      'For body, min length should be 50 an max length should be 500'
    ),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({status: 0, debug_errors: errors});
    } else {
      let updatedValues = {$set: req.body};
      Forum.findByIdAndUpdate(req.params.id, updatedValues, function (err) {
        if (err) {
          res.json(err);
        } else {
          res.json({
            status: `Forum with id as ${req.params.id} is updated`,
          });
        }
      });
    }
  },
];
module.exports = {getForum, createForum, deleteForum, updateForum};
