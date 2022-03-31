function custommiddleware(req, res, next) {
  console.log('Came in');
  if (req.params.name) {
    if (req.params.name === 'danger') {
      console.log('Error');
      res.json({status: 0, debug_data: 'You cannot send danger as name '});
    }
  }
  next();
}

module.exports = custommiddleware;
