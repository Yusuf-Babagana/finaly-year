module.exports = (req, res) => {
  if (Number(req.session.userId) != NaN) {
    req.session.destroy(() => {
      res.redirect("/login");
    });
  } else {
    console.log("Error logging out: Inavlid session userId")
    res.redirect("/login");
  }
};