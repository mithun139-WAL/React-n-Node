const Product = require('../models/products');
const getProducts = (req, res) => {
  Product.find((err, products_list) => {
    if (err) {
      res.json(err);
    } else {
      res.json(products_list);
    }
  });
};
const createProducts = (req, res) => {
  productObj = new Product(req.body);
  productObj.save((err) => {
    if (err) {
      res.json(err);
    } else {
      res.json('Product added successfully');
    }
  });
};
const editProducts = (req, res) => {
  const updateOb = req.body;
  Product.findByIdAndUpdate(req.params.id, updateOb, function (err) {
    if (err) {
      res.json(err);
    } else {
      res.json(`Product with id as ${req.params.id} is updated`);
    }
  });
};
const getProductWithId = (req, res) => {
  Product.findById(req.params.id).exec((err, product) => {
    if (err) {
      res.json(err);
    } else {
      res.json(product);
    }
  });
};
const deleteProductWithId = (req, res) => {
  Product.findByIdAndDelete(req.params.id).exec((err) => {
    if (err) {
      res.json(err);
    } else {
      res.json(`Product with id as ${req.params.id} is removed`);
    }
  });
};
const getProductWithName = (req, res) => {
  Product.find({name: req.params.name}).exec((err, product) => {
    if (err) {
      res.json(err);
    } else {
      res.json(product);
    }
  });
};
const getProductWithAvailability = (req, res) => {
  Product.find({availability: req.params.availability}).exec((err, product) => {
    if (err) {
      res.json(err);
    } else {
      res.json(product);
    }
  });
};
const getProductWithPrice = (req, res) => {
  Product.find({price: {$gte: req.params.price}}).exec((err, product) => {
    if (err) {
      res.json(err);
    } else {
      res.json(product);
    }
  });
};
module.exports = {
  getProducts,
  createProducts,
  editProducts,
  getProductWithId,
  deleteProductWithId,
  getProductWithName,
  getProductWithAvailability,
  getProductWithPrice,
};
