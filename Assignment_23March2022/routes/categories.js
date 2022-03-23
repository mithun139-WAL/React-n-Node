const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categories');
router.get('/', categoriesController.getCategories);
router.post('/', categoriesController.createCategories);
router.delete('/:id', categoriesController.deleteCategories);
router.put('/:id', categoriesController.editCategories);
module.exports = router;
