var express = require('express');
const userController = require('../controllers/userValid');
var router = express.Router();

router.get('/createtable', userController.createTable);
router.get('/', userController.getUsers);
router.post('/login', userController.login);
router.post('/adduser', userController.addUser);
router.put('/edituser/:id', userController.editUser);

module.exports = router;
