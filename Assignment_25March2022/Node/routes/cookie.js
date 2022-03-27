var express = require('express');
var router = express.Router();

router.get('/setcookie/:name/:value', function (req, res) {
  res.cookie(req.params.name, req.params.value);
  res.send(
    `cookie with name ${req.params.name} and value ${req.params.value} set`
  );
});
router.get('/setcookiewithtime/:name/:value/:time', function (req, res) {
  res.cookie(req.params.name, req.params.value, {
    maxAge: req.params.time * 60 * 1000,
  });
  res.send(
    `cookies with name ${req.params.name} and value is ${req.params.value} set and will expire in ${req.params.time} minutes`
  );
});
router.get('/viewcookies', function (req, res) {
  res.send(req.cookies);
});
router.get('/delete/:name', function (req, res) {
  res.clearCookie(req.params.name);
  res.send(`cookies with name ${req.params.name} is deleted`);
});
module.exports = router;
