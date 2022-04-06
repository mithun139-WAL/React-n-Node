var express = require('express');
var router = express.Router();
const customersModel = require('../models').Customer;

router.get('/', function (req, res, next) {
  customersModel.findAll().then(
    function (customers) {
      res.status(200).json(customers);
    },
    function (error) {
      res.status(500).json(error);
    }
  );
});

router.post('/', (req, res) => {
  customersModel.create(req.body).then(
    (customer) => {
      res.status(200).json({status: 1, customer});
    },
    (error) => {
      res.status(500).json(error);
    }
  );
});

module.exports = router;
