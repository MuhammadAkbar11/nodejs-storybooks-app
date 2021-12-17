const StoryModel = require("../models/Story");
const ErrorResponse = require("../utils/error");

// @desc Landing Page
// @route GET /
exports.getIndex = (req, res) => {
  res.render("home", {
    title: "Welcome",
    path: "/",
  });
};

// @desc About Page
// @route GET /about
exports.getAbout = (req, res) => {
  res.render("coming-soon", {
    layout: "coming-soon",
    title: "About us",
    path: "/about",
  });
};

// @desc Contact Page
// @route GET /contact
exports.getContact = (req, res) => {
  res.render("coming-soon", {
    layout: "coming-soon",
    title: "Contact ",
    path: "/contact",
  });
};

// @desc Dashboard
// @route GET /dashboard
exports.getDashboard = async (req, res, next) => {
  const flashdata = req.flash("flashdata");
  try {
    const stories = await StoryModel.find({ user: req.user._id }).lean();

    return res.render("dashboard", {
      title: "Dashboard",
      path: "/dashboard",
      user: {
        name: req.user.displayName,
      },
      stories,
      flashdata,
    });
  } catch (err) {
    res.status(500);

    next(new ErrorResponse(err?.statusCode || 500, "Oppss"));
  }
};
