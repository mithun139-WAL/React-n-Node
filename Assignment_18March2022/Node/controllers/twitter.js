const {body, validationResult} = require('express-validator');
let tweet = [
  {
    title: 'Batman',
    body: 'Alpha',
    date_of_creation: '2000-08-01',
    author: 'Bruce Wayne',
    category: 'entertainment',
  },
];
function getTweet(req, res) {
  res.json(tweet);
}
function deleteAll(req, res) {
  tweet = [];
  res.json({status: 'Deleted all the Tweets'});
}
const createTweet = [
  body('title')
    .trim()
    .isLength({min: 5, max: 50})
    .withMessage('Min sholud be 3 and Max length to be 50')
    .isAlphanumeric()
    .withMessage(
      'Only alphabets and numbers allowed. No special characters allowed'
    ),
  body('body')
    .trim()
    .isLength({min: 5, max: 200})
    .withMessage('In range of 8 and 200 characters')
    .escape(),
  body('author')
    .trim()
    .isLength({min: 5, max: 100})
    .withMessage('Min sholud be 5 and Max length to be 100')
    .escape()
    .isAlphanumeric()
    .withMessage(
      'Only alphabets and numbers allowed. No special characters allowed'
    ),
  (req, res) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      res.json({status: 0, debug_data: errors});
    } else {
      console.log(req.body);
      let {title, body, date_of_creation, author, category} = req.body;
      tweet.push({title, body, date_of_creation, author, category});
      console.log(tweet);
      res.json({status: 'Added Tweet'});
    }
  },
];

function deleteTweet(req, res) {
  console.log(req.params.indexToDelete);
  let newTweet = tweet.filter((val, index) => {
    if (index === parseInt(req.params.indexToDelete)) {
      console.log('Return False');
      return false;
    } else {
      return true;
    }
  });
  console.log(newTweet);
  tweet = newTweet;
  res.json({status: 'Succesfully Deleted Tweets'});
}

module.exports = {getTweet, createTweet, deleteTweet, deleteAll};
