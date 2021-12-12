const StoryModel = require("../models/Story");

// @desc Landing Page
// @route GET /
exports.getIndex = (req, res) => {
  res.render("home", {
    title: "Welcome",
    path: "/",
  });
};

// @desc Dashboard
// @route GET /dashboard
exports.getDashboard = async (req, res) => {
  const flashdata = req.flash("flashdata");
  try {
    const stories = await StoryModel.find({ user: req.user._id }).lean();
    console.log(flashdata);
    res.render("dashboard", {
      title: "Dashboard",
      path: "/dashboard",
      user: {
        name: req.user.displayName,
      },
      stories,
      flashdata,
    });
  } catch (error) {}
};
