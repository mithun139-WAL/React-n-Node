var express = require('express');
var router = express.Router();
const connector = require('../poolconnect');

router.get('/createTable', function (req, res) {
  var sql =
    'CREATE TABLE user (id INT  AUTO_INCREMENT PRIMARY KEY, username varchar(25), password varchar(100), date_of_creation date);';
  connector.query(sql, function (err, results, fields) {
    res.json({err, results, fields});
  });
});

router.get('/', function (req, res) {
  const sql = 'SELECT * FROM user';
  connector.query(sql, function (err, results) {
    res.json({err, results});
  });
});

router.post('/', function (req, res) {
  const {id, username, password} = req.body;
  connector.query('SELECT * FROM user', function (err, results) {
    if (error === null) {
      results.forEach((user) => {
        if (user.username === username) {
          res.json({status: 0, debug_data: 'Username already exists'});
        }
      });
      const sql = 'INSERT INTO user VALUES(?,?,?,?)';
      connector.query(
        sql,
        [id, username, password, new Date().toLocaleDateString()],
        function (err, results) {
          if (err === null) {
            res.json({status: 1, data: 'User created'});
          } else {
            res.json({
              message: 'Error while creating user',
              err,
            });
          }
        }
      );
    } else {
      res.json({
        message: 'Error while loading users',
      });
    }
  });
});

router.put('/:id', function (req, res) {
  const {username, password, date_of_creation} = req.body;
  const sql = `UPDATE user SET username=?, password=?, date_of_creation=? WHERE id="${req.params.id}";`;
  connector.query(
    sql,
    [username, password, date_of_creation],
    function (err, results) {
      res.json({err, results});
    }
  );
});

router.delete('/:id', function (req, res) {
  const sql = `DELETE FROM user WHERE id="${req.params.id}";`;
  connector.query(sql, function (err, results) {
    res.json({err, results});
  });
});

router.delete('/delete/all', function (req, res) {
  const sql = 'DROP TABLE user';
  connector.query(sql, function (err, results) {
    res.json({err, results});
  });
});

router.get('/checklogin', function (req, res) {
  const {username, password} = req.body;
  let flag = false;
  connector.query('SELECT * FROM user', function (err, results) {
    results.forEach((user) => {
      if (user.username === username && user.password === password) {
        flag = true;
      }
    });
    if (flag) {
      req.session['isLoggedIn'] = 1;
      req.session['username'] = username;
      res.json({status: 1, data: username});
    } else {
      req.session['isLoggedIn'] = 0;
      res.json({status: 0, data: 'incorrect login details'});
    }
  });
});

router.get('/loggeduser', (req, res) => {
  if (req.session.isLoggedIn === 1) {
    const sql = 'SELECT * FROM user WHERE username=?;';
    connector.query(sql, [req.session.username], (err, results) => {
      res.json({err, results});
    });
  } else {
    res.json({status: 0, debug_data: 'you are not logged in '});
  }
});
module.exports = router;
