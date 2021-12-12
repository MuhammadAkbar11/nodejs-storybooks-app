// @desc Login
// @route GET /auth
exports.getLogin = (req, res) => {
  res.render("login", {
    layout: "login",
  });
};

// @desc Auth with Goole
// @route GET /auth/logout
exports.postLogout = (req, res) => {
  req.logout();
  res.redirect("/");
};

// @desc Auth with Goole
// @route GET /auth/google/callback
exports.getGoogleAuthCallback = (req, res) => {
  res.redirect("/dashboard");
};
