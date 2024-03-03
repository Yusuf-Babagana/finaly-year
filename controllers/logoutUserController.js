module.exports = (req, res) => {
  if (Number(req.session.userId) != NaN) {
    req.session.destroy(() => {
      res.redirect("/");
    });
  } else {
    res.redirect("/login");
  }
};