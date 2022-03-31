const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userjwt');

exports.createUser = function (req, res) {
  console.log(req.body);
  let encryptedpassword;
  try {
    let salt = bcrypt.genSaltSync(10);
    console.log(salt);
    encryptedpassword = bcrypt.hashSync(req.body.password, salt);
    console.log(encryptedpassword);
  } catch (error) {
    console.log(error);
    console.log('Error in bcrypt');
  }
  const userOb = new User({
    username: req.body.username,
    dob: req.body.dob,
    password: encryptedpassword,
    email: req.body.email,
  });
  console.log(userOb);
  userOb.save(function (err) {
    if (err) {
      console.log(err);
    } else {
      res.json('User created successfully');
    }
  });
};

exports.getuser = function (req, res) {
  User.find((err, users_list) => {
    if (err) {
      res.json(err);
    } else {
      res.json(users_list);
    }
  });
};

exports.deleteUserWithId = (req, res) => {
  User.findByIdAndDelete(req.params.id).exec((err) => {
    if (err) {
      res.json(err);
    } else {
      res.json(`User with id as ${req.params.id} is removed`);
    }
  });
};

exports.getUsername = async (req, res) => {
  const username = req.params.username;
  console.log(username);
  let userOb = await User.findOne({username});
  console.log(userOb);
  let flag = false;
  try {
    if (username === userOb.username) {
      flag = true;
    }
  } catch (err) {
    console.log(err);
  }
  if (flag) {
    res.status(400).json({status: 1, debug_data: 'Username found'});
  } else {
    res.status(400).json({status: 0, debug_data: 'Username not found'});
  }
};

exports.getEmail = async (req, res) => {
  const email = req.params.email;
  console.log(email);
  let userOb = await User.findOne({email});
  console.log(userOb);
  let flag = false;
  try {
    if (email === userOb.email) {
      flag = true;
    }
  } catch (err) {
    console.log(err);
  }
  if (flag) {
    res.status(400).json({status: 1, debug_data: 'email id found'});
  } else {
    res.status(400).json({status: 0, debug_data: 'email id not found'});
  }
};

exports.loginUser = async (req, res) => {
  const {email, password} = req.body;
  let userOb = await User.findOne({email});
  console.log(userOb.username);
  if (!userOb) {
    res.status(400).json({status: 0, debug_data: 'User not found'});
  }
  const passCorrect = await bcrypt.compareSync(password, userOb.password);
  if (!passCorrect) {
    res.status(400).json({status: 0, debug_data: 'User credentials wrong'});
  }
  const payload = {
    user: {
      email: email,
    },
  };
  jwt.sign(
    payload,
    'secret_string',
    {
      expiresIn: 1200,
    },
    (err, token) => {
      if (err) {
        throw error;
        res.json({
          status: 0,
          debug_data: 'Temporary error in backend',
        });
      }
      res.status(200).json({
        token,
      });
    }
  );
};
