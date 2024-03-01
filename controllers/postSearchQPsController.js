module.exports = (req, res) => {
  let searchParams = Object.fromEntries(Object.entries(req.body).filter(([_, v]) => v));
  const queryParams = new URLSearchParams(searchParams);
  const resultsUrl = `${req.path}?${queryParams.toString()}`;
  res.redirect(resultsUrl);
};
