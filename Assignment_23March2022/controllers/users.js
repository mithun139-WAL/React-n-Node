const User = require('../models/users');
const getUsers = (req, res) => {
  User.find((err, users_list) => {
    if (err) {
      res.json(err);
    } else {
      res.json(users_list);
    }
  });
};
const createUsers = (req, res) => {
  userObj = new User(req.body);
  userObj.save((err) => {
    if (err) {
      res.json(err);
    } else {
      res.json('User added successfully');
    }
  });
};
const editUsers = (req, res) => {
  const updateOb = req.body;
  User.findByIdAndUpdate(req.params.id, updateOb, function (err) {
    if (err) {
      res.json(err);
    } else {
      res.json(`User with id as ${req.params.id} is updated`);
    }
  });
};
const deleteUserWithId = (req, res) => {
  User.findByIdAndDelete(req.params.id).exec((err) => {
    if (err) {
      res.json(err);
    } else {
      res.json(`User with id as ${req.params.id} is removed`);
    }
  });
};
const getUserWithId = (req, res) => {
  User.findById(req.params.id).exec((err, user) => {
    if (err) {
      res.json(err);
    } else {
      res.json(user);
    }
  });
};
const getUserWithUserName = (req, res) => {
  User.find({username: req.params.username}).exec((err, user) => {
    if (err) {
      res.json(err);
    } else {
      res.json(user);
    }
  });
};
const getUserWithName = (req, res) => {
  User.find({name: req.params.name}).exec((err, user) => {
    if (err) {
      res.json(err);
    } else {
      res.json(user);
    }
  });
};
const getUserWithDOB = (req, res) => {
  User.find({dob: req.params.dob}).exec((err, user) => {
    if (err) {
      res.json(err);
    } else {
      res.json(user);
    }
  });
};
const getUserWithPassword = (req, res) => {
  User.find({password: req.params.password}).exec((err, user) => {
    if (err) {
      res.json(err);
    } else {
      res.json(user);
    }
  });
};
module.exports = {
  getUsers,
  createUsers,
  editUsers,
  getUserWithId,
  deleteUserWithId,
  getUserWithUserName,
  getUserWithName,
  getUserWithDOB,
  getUserWithPassword,
};
