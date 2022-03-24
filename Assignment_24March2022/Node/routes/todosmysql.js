var express = require('express');
var router = express.Router();
const connector = require('../connect');
router.get('/createTable', function (req, res) {
  var sql =
    'CREATE TABLE todos(id int AUTO_INCREMENT PRIMARY KEY,item varchar(20),status varchar(20))';
  connector.query(sql, function (err, results, fields) {
    res.json({err, results, fields});
  });
});
router.post('/', function (req, res) {
  const {item, status} = req.body;
  var sql = `INSERT INTO todos (item,status) values ("${item}","${status}")`;
  connector.query(sql, function (err, results, fields) {
    res.json({err, results, fields});
  });
});
router.get('/', function (req, res) {
  const sql = 'SELECT * FROM todos';
  connector.query(sql, function (err, results) {
    res.json({err, results});
  });
});
router.delete('/:id', function (req, res) {
  const sql = `DELETE FROM todos WHERE id=${parseInt(req.params.id)}`;
  connector.query(sql, function (err, results, fields) {
    res.json({err, results, fields});
  });
});
router.delete('/', function (req, res) {
  const sql = `DROP TABLE todos`;
  connector.query(sql, function (err, results, fields) {
    res.json({err, results, fields});
  });
});
router.put('/:id', function (req, res) {
  const {item, status} = req.body;
  var sql = `UPDATE todos SET item="${item}",status="${status}" WHERE id=${parseInt(
    req.params.id
  )}`;
  connector.query(sql, function (err, results, fields) {
    res.json({err, results, fields});
  });
});
module.exports = router;
