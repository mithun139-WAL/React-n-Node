const express = require('express');
const authorsController = require('../controllers/authors');
const router = express.Router();
router.get('/', authorsController.getAuthors);
router.post('/', authorsController.createAuthors);
router.delete('/:id', authorsController.deleteAuthors);
router.put('/:id', authorsController.updateAuthors);
module.exports = router;
