const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');

router.get('/', usersController.getUsers);
router.post('/', usersController.createUsers);
router.put('/:id', usersController.editUsers);
router.delete('/:id', usersController.deleteUserWithId);
router.get('/:id', usersController.getUserWithId);
router.get('/namesearch/:name', usersController.getUserWithName);
router.get('/usernamesearch/:username', usersController.getUserWithUserName);
router.get('/dobsearch/:dob', usersController.getUserWithDOB);
router.get('/passwordsearch/:password', usersController.getUserWithPassword);

module.exports = router;
