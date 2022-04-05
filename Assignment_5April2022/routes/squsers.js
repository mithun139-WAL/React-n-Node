var express = require('express');
var router = express.Router();
const usersModel = require('../models').User;

router.get('/', function (req, res, next) {
  usersModel.findAll().then(
    function (users) {
      res.status(200).json(users);
    },
    function (error) {
      res.status(500).json(error);
    }
  );
});

router.post('/', (req, res) => {
  const {username, password} = req.body;
  usersModel.findAll().then(
    function (users) {
      let flag = false;
      users.forEach((user) => {
        if (user.username === username) {
          flag = true;
        }
      });
      if (flag) {
        res.status(409).json({status: 0, debug_date: 'user exists'});
      } else {
        usersModel
          .create({
            username,
            password,
            date_of_creation: new Date().toLocaleString(),
          })
          .then(
            (user) => {
              res.status(200).json({status: 1, user});
            },
            (error) => {
              res.status(500).json(error);
            }
          );
      }
    },
    function (error) {
      res.status(500).json(error);
    }
  );
});

router.put('/:username', (req, res) => {
  const {username, password} = req.body;
  usersModel.findOne({where: {username: req.params.username}}).then((user) => {
    if (user !== null) {
      usersModel
        .update(
          {username: username, password: password},
          {where: {username: req.params.username}}
        )
        .then(
          (user) => {
            res.status(200).json({status: 1, data: 'Modified Successfully'});
          },
          (err) => {
            res.status(500).send(err);
          }
        );
    } else {
      res.json({status: 0, debug_data: 'No user found'});
    }
  });
});

router.get('/:username', (req, res) => {
  usersModel.findOne({where: {username: req.params.username}}).then(
    (user) => {
      if (user != null) res.status(200).json(user);
      else res.json({status: 0, data: 'No User found'});
    },
    (err) => {
      res.status(500).send(err);
    }
  );
});

router.delete('/:username', (req, res) => {
  usersModel
    .destroy({
      where: {
        username: req.params.username,
      },
    })
    .then((status) => {
      if (status === 1) {
        res
          .status(200)
          .json({status: 1, debug_date: 'Deleted user successfully'});
      } else {
        res.status(404).json({status: 0, debug_date: 'No user found'});
      }
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

router.get('/checklogin', async (req, res) => {
  const user = await usersModel.findOne({
    where: {
      username: req.body.username,
    },
  });
  if (user !== null) {
    if (user.password === req.body.password) {
      req.session.LoggedIn = 1;
      req.session.user = user;
      res.status(200).json({status: 1, data: 'Login successful'});
    } else {
      req.session.LoggedIn = 0;
      res.json({status: 0, debug_data: 'User credentials are invalid'});
    }
  } else {
    res.json({status: 0, debug_data: 'No User found'});
  }
});

router.get('/loggeduser', (req, res) => {
  if (req.session.isLoggedIn === 1) {
    usersModel.findOne().then(
      function (user) {
        res.status(200).json({status: 1, data: user});
      },
      function (error) {
        res.status(500).json(error);
      }
    );
  } else {
    res.json({status: 0, debug_data: 'User not Logged IN '});
  }
});

module.exports = router;
