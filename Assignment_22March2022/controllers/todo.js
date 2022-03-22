const {body, validationResult} = require('express-validator');
const Todo = require('../models/todos');
function getTodos(req, res) {
  Todo.find((err, todos_list) => {
    if (err) {
      res.json(err);
    } else {
      res.json(todos_list);
    }
  });
}

const createTodo = [
  body('item')
    .trim()
    .isLength({min: 3, max: 100})
    .withMessage('Min sholud be 3 and Max length to be 20')
    .escape()
    .withMessage(
      'Only alphabets and numbers allowed. No special characters allowed'
    ),
  body('status')
    .trim()
    .isLength({min: 8, max: 15})
    .withMessage('In range of 8 and 15 characters'),
  (req, res) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      res.json({status: 0, debug_data: errors});
    } else {
      console.log(req.body);
      let {item, status} = req.body;
      let todoObject = new Todo({item, status});
      todoObject.save((error) => {
        if (error) {
          res.json(error);
        } else {
          res.json({status: 'Adding Todo completed'});
        }
      });
    }
  },
];

function deleteTodo(req, res) {
  Todo.findByIdAndDelete(req.params._id, function (err) {
    if (err) {
      res.json(error);
    } else {
      res.json(`Todo with _id as ${req.params._id} is removed`);
    }
  });
}

module.exports = {getTodos, createTodo, deleteTodo};
