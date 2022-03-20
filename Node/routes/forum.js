const express = require('express');
const router = express.Router();
let forums = [
  {
    title: 'Title',
    date: '2000-01-08',
    body: 'With Great Power comes Great Responsibities',
    author: 'Stan lee',
  },
];
router.get('/', function (req, res) {
  res.json(forums);
});
router.post('/', function (req, res) {
  forums.push(req.body);
  res.json({status: 'Forum added'});
});
router.delete('/:indexToDelete', function (req, res) {
  let newforums = forums.filter((val, index) => {
    if (index === parseInt(req.params.indexToDelete)) {
      return false;
    } else {
      return true;
    }
  });
  forums = newforums;
  res.json({status: 'Deleted !!'});
});
router.put('/clearAll', function (req, res) {
  forums = [];
  res.json({status: 'Deleted all the forums'});
});

module.exports = router;
