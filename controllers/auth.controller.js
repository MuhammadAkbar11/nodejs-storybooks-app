exports.getLogin = (req, res) => {
  res.render("login", {
    layout: "login",
  });
};

exports.getGoogleAuthCallback = (req, res) => {
  res.redirect("/dashboard");
};
