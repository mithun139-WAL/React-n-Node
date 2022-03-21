const {body, validationResult} = require('express-validator');
let todos = [
  {item: 'initial todo1', status: 'Complete'},
  {item: 'initial Todo2', status: 'incomplete'},
];
function getTodos(req, res) {
  res.json(todos);
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
      todos.push({item, status});
      console.log(todos);
      res.json({status: 'Adding Todo complete'});
    }
  },
];

function deleteTodo(req, res) {
  console.log(req.params.indexToDelete);
  let newTodos = todos.filter((val, index) => {
    if (index === parseInt(req.params.indexToDelete)) {
      console.log('Return False');
      return false;
    } else {
      return true;
    }
  });
  console.log(newTodos);
  todos = newTodos;
  res.json({status: 'Succesfully Deleted Todos'});
}

module.exports = {getTodos, createTodo, deleteTodo};
