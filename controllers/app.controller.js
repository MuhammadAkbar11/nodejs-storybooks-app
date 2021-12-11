exports.getIndex = (req, res) => {
  res.render("home", {
    title: "Welcome",
    path: "/",
  });
};

exports.getDashboard = (req, res) => {
  console.log(req.user);
  res.render("dashboard", {
    title: "Dashboard",
    path: "/dashboard",
    user: req.user,
  });
};
