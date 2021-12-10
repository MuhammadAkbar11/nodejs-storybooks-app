exports.getIndex = (req, res) => {
  res.render("home", {
    title: "Welcome",
  });
};

exports.getDashboard = (req, res) => {
  res.render("dashboard", {
    title: "Dashboard",
  });
};
