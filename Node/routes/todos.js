var express = require('express');
var router = express.Router();
let todos = [
  {item: 'initial todo1', status: 'Complete'},
  {item: 'initial Todo2', status: 'incomplete'},
];
router.get('/', function (req, res) {
  res.json(todos);
});
router.post('/', function (req, res) {
  let {item, status} = req.body;
  todos.push({item, status});
  res.json({status: 'Adding todo Complete'});
});

router.delete('/:indexToDelete', function (req, res) {
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
});

module.exports = router;
