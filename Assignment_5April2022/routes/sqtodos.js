const express = require('express');
const router = express.Router();
const todosModel = require('../mysqlmodels/todos');

router.get('/', function (req, res) {
  todosModel.findAll().then(
    function (todos) {
      res.status(200).json(todos);
    },
    function (error) {
      res.status(500).send(error);
    }
  );
});

router.get('/create/:title/:description/:status', function (req, res) {
  todosModel
    .create({
      status: req.params.status,
      title: req.params.title,
      description: req.params.description,
    })
    .then(function (todos) {
      res.status(200).json(todos);
    });
});
module.exports = router;
