const express = require('express');
const router = express.Router();
let products = [
  {
    name: 'Remote Car',
    price: '3000',
    description: 'Wireless Remote controllable car',
    category: 'toys',
    status: 'Available',
  },
];
router.get('/', function (req, res) {
  res.json(products);
});
router.post('/', function (req, res) {
  products.push(req.body);
  res.json({status: 'Product added'});
});
router.delete('/:indexToDelete', function (req, res) {
  let newProducts = products.filter((val, index) => {
    if (index === parseInt(req.params.indexToDelete)) {
      return false;
    } else {
      return true;
    }
  });
  products = newProducts;
  res.json({status: 'Deleted !!'});
});
router.put('/', function (req, res) {
  products = [];
  res.json({status: 'Deleted all the Products'});
});
module.exports = router;
