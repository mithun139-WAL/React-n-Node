var express = require('express');
var router = express.Router();
const hobbyModel = require('../models').Hobby;

router.get('/', (req, res) => {
  hobbyModel.findAll().then(
    function (products) {
      res.status(200).json(products);
    },
    function (error) {
      res.status(500).json(error);
    }
  );
});

router.get('/create', (req, res) => {
  hobbyModel.create({name: 'hobby 1', description: 'description 1'}).then(
    (hobby) => {
      res.status(200).json(hobby);
    },
    (error) => {
      res.status(500).json(error);
    }
  );
});

module.exports = router;
