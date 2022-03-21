const express = require('express');
const router = express.Router();
let hobbies = [
  {
    name: 'Watching Movies',
    description: 'All Genre movies',
    doc: '2000-08-01',
  },
];
router.get('/', function (req, res) {
  res.json(hobbies);
});
router.post('/', function (req, res) {
  hobbies.push(req.body);
  res.json({status: 'Hobby added'});
});
router.delete('/:indexToDelete', function (req, res) {
  let newHobbies = hobbies.filter((val, index) => {
    if (index === parseInt(req.params.indexToDelete)) {
      return false;
    } else {
      return true;
    }
  });
  hobbies = newHobbies;
  res.json({status: 'Deleted !!'});
});
router.put('/', function (req, res) {
  hobbies = [];
  res.json({status: 'Deleted all the Hobbies'});
});
module.exports = router;
