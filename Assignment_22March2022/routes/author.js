var express = require('express');
var router = express.Router();
var authorController = require('../controllers/author');
router.get('/', authorController.getAuthor);
router.post('/', authorController.createAuthor);
router.delete('/:id', authorController.deleteAuthor);
module.exports = router;
