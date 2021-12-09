exports.getLogin = (req, res) => {
  res.render("login", {
    layout: "login",
  });
};
