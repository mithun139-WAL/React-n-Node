var express = require('express');
var router = express.Router();
const companyController = require('../controllers').Company;

/* GET home page. */
router.get('/', function (req, res, next) {
  res.status(200).send({message: 'Company Table'});
});
router.post('/api/company', companyController.create);

module.exports = router;
