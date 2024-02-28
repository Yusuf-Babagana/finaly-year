module.exports = (req, res) => {
  let searchParams = Object.fromEntries(Object.entries(req.body).filter(([_, v]) => v));
  const queryParams = new URLSearchParams(searchParams);
  const resultsUrl = `/departments/${req.params.code}/question-papers/search?${queryParams.toString()}`
  res.redirect(resultsUrl);
};
