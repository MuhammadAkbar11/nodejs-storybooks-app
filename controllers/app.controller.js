const StoryModel = require("../models/Story");

exports.getIndex = (req, res) => {
  res.render("home", {
    title: "Welcome",
    path: "/",
  });
};

exports.getDashboard = async (req, res) => {
  try {
    const stories = await StoryModel.find({ user: req.user._id }).lean();

    res.render("dashboard", {
      title: "Dashboard",
      path: "/dashboard",
      user: {
        name: req.user.displayName,
      },
      stories,
    });
  } catch (error) {}
};
