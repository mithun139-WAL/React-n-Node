var express = require('express');
var router = express.Router();
var tweetController = require('../controllers/twitter');

router.get('/', tweetController.getTweet);
router.post('/', tweetController.createTweet);
router.delete('/:indexToDelete', tweetController.deleteTweet);
router.put('/clearAll', tweetController.deleteAll);
module.exports = router;
