var express = require('express');
var router = express.Router();
var todoController = require('../controllers/todo');
router.get('/', todoController.getTodos);
router.post('/', todoController.createTodo);
router.delete('/:id', todoController.deleteTodo);
router.put('/:_id', todoController.editTodo);
module.exports = router;
