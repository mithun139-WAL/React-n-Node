const express = require('express');
const usersController = require('../controllers/usersjwt');
const router = express.Router();

router.get('/', usersController.getuser);
router.post('/', usersController.createUser);
router.post('/login', usersController.loginUser);
router.delete('/delete/:id', usersController.deleteUserWithId);
router.get('/getusername/:username', usersController.getUsername);
router.get('/getemail/:email', usersController.getEmail);
module.exports = router;
