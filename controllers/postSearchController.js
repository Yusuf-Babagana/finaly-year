module.exports = (req, res) => {
  const searchParams = new URLSearchParams(req.body);
  const resultsUrl = `/departments/${req.params.code}/search?${searchParams.toString()}`
  res.redirect(resultsUrl);
};
