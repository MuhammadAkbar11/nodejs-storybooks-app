const StoryModel = require("../models/Story");
const { consoleDev } = require("../utils");
const { NODE_ENV } = require("../utils/contants");

// @desc Show Add Story Page
// @route GET /stories/add
exports.getPublicStories = async (req, res) => {
  try {
    const stories = await StoryModel.find({ status: "public" })
      .populate("user")
      .sort({ createdAt: "desc" })
      .lean();
    res.render("stories/index", {
      title: "Public Stories",
      path: "/stories",
      stories,
    });
  } catch (error) {
    consoleDev(error);
  }
};

// @desc Show Add Story Page
// @route GET /stories/add
exports.getAddStory = (req, res) => {
  console.log(NODE_ENV);
  res.render("stories/add", {
    title: "Add Story",
    path: "/stories/add",
  });
};

// @desc  Add new story
// @route POST /stories/add
exports.postAddStory = async (req, res) => {
  console.log(req.body);
  const { title, body, status } = req.body;
  const user = req.user._id;

  try {
    await StoryModel.create({ title: title, body, status, user });

    req.flash("flashdata", {
      type: "success",
      message: "Success adding new story",
    });
    res.redirect("/dashboard");
  } catch (error) {
    req.flash("flashdata", {
      type: "danger",
      message: "Failed to adding story ",
    });
    res.redirect("/dashboard");
  }
};
