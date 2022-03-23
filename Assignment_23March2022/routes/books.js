const express = require('express');
const router = express.Router();
const booksController = require('../controllers/books');

router.get('/', booksController.getBooks);
router.post('/', booksController.createBooks);
router.put('/:id', booksController.editBooks);
router.get('/bookandauthor', booksController.getBookWithAuthor);
router.get('/bookandcondition/:name', booksController.getBookWithCondition);
router.get('/authorandcategory', booksController.getBookWithAuthorAndCategory);
router.get('/:id', booksController.getBookWithId);

module.exports = router;
