exports.getLogin = (req, res) => {
  res.render("login", {
    layout: "login",
  });
};

exports.postLogout = (req, res) => {
  req.logout();
  res.redirect("/");
};

exports.getGoogleAuthCallback = (req, res) => {
  res.redirect("/dashboard");
};
