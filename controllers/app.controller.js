exports.getIndex = (req, res) => {
  res.render("home", {
    title: "Welcome",
    path: "/",
  });
};

exports.getDashboard = (req, res) => {
  res.render("dashboard", {
    title: "Dashboard",
    path: "/dashboard",
  });
};
