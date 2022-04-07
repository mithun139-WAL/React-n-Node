const express = require('express');
const logger = require('morgan');
const router = express.Router();
router.use(
  logger(
    'Custom Logging status :status  :method :url :res[content-length] - :response-time ms '
  )
);
router.get('/', (req, res) => {
  res.json('response from server');
});
module.exports = router;
