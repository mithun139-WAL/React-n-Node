var express = require('express');
var router = express.Router();
const connector = require('../connect');
router.get('/createTable', function (req, res) {
  var sql =
    'CREATE TABLE authors(id int AUTO_INCREMENT PRIMARY KEY,first_name varchar(50),last_name varchar(50),dob date,dod date)';
  connector.query(sql, function (err, results, fields) {
    res.json({err, results, fields});
  });
});
router.post('/', function (req, res) {
  const {first_name, last_name, dob, dod} = req.body;
  var sql = `INSERT INTO authors (first_name, last_name, dob, dod) VALUES ("${first_name}", "${last_name}", "${dob}", "${dod}")`;
  connector.query(sql, function (err, results, fields) {
    res.json({err, results, fields});
  });
});
router.get('/', function (req, res) {
  var sql = 'SELECT * FROM authors';
  connector.query(sql, function (err, results) {
    res.json({err, results});
  });
});
router.delete('/:id', function (req, res) {
  const sql = `DELETE FROM authors WHERE id=${parseInt(req.params.id)}`;
  connector.query(sql, function (err, results, fields) {
    res.json({err, results, fields});
  });
});
router.delete('/', function (req, res) {
  const sql = `DROP TABLE authors`;
  connector.query(sql, function (err, results, fields) {
    res.json({err, results, fields});
  });
});
router.put('/:id', function (req, res) {
  const {first_name, last_name, dob, dod} = req.body;
  var sql = `UPDATE authors SET first_name="${first_name}", last_name="${last_name}", dob="${dob}", dod="${dod}" WHERE id=${parseInt(
    req.params.id
  )}`;
  connector.query(sql, function (err, results, fields) {
    res.json({err, results, fields});
  });
});
module.exports = router;
