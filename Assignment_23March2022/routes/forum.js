var express = require('express');
var router = express.Router();
var forumController = require('../controllers/forum');
router.get('/', forumController.getForum);
router.post('/', forumController.createForum);
router.delete('/:id', forumController.deleteForum);
router.put('/:id', forumController.updateForum);
module.exports = router;
