const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products');
router.get('/', productsController.getProducts);
router.post('/', productsController.createProducts);
router.put('/:id', productsController.editProducts);
router.delete('/:id', productsController.deleteProductWithId);
router.get('/:id', productsController.getProductWithId);
router.get('/productsearch/:name', productsController.getProductWithName);
router.get(
  '/productsearch/availability/:availability',
  productsController.getProductWithAvailability
);
router.get(
  '/productsearch/price/:price',
  productsController.getProductWithPrice
);

module.exports = router;
