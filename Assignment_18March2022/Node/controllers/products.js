function productsIndex(req, res) {
  res.send('You are at base route of Product');
}
function productsDetails(req, res) {
  res.send('We are at details page of products');
}

module.exports = {productsIndex, productsDetails};
