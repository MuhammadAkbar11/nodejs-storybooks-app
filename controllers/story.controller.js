const mongoose = require("mongoose");
const StoryModel = require("../models/Story");
const { consoleDev } = require("../utils");
const { NODE_ENV } = require("../utils/contants");
const ErrorResponse = require("../utils/error");

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
    const errRes = new ErrorResponse(error);
    res.status(404);
    next(errRes);
  }
};

// @desc Show Add Story Page
// @route GET /stories/add
exports.getAddStory = (req, res) => {
  try {
    res.render("stories/add", {
      title: "Add Story",
      path: "/stories/add",
    });
  } catch (error) {
    const errRes = new ErrorResponse(error);
    res.status(404);
    next(errRes);
  }
};

// @desc  Add new story
// @route POST /stories/add
exports.postAddStory = async (req, res) => {
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

// @desc Show Edit Story Page
// @route GET /stories/edit/:id
exports.getEditStory = async (req, res, next) => {
  try {
    const story = await StoryModel.findOne({ _id: req.params.id }).lean();

    if (!story) {
      res.status(404);
      throw new ErrorResponse({
        statusCode: 404,
        message: "Product not found",
      });
    }

    if (story.user.toString() != req.user._id.toString()) {
      res.redirect("/dashboard");
      return;
    } else {
      res.render("stories/edit", {
        title: "Edit Story",
        path: "/stories/edit",
        story,
      });
    }
  } catch (error) {
    const errRes = new ErrorResponse(error);
    res.status(404);
    next(errRes);
  }
};

// @desc  Update Story
// @route PUT /stories/:id
exports.putEditStory = async (req, res) => {
  const { title, body, status } = req.body;
  const storyId = req.params.id;
  try {
    const story = await StoryModel.findById(storyId);

    if (!story) {
      req.flash("flashdata", {
        type: "danger",
        message: "Story not found, Failed to update story",
      });
      res.redirect("/dashboard");
      return;
    }
    if (story.user.toString() != req.user._id.toString()) {
      res.redirect("/dashboard");
      return;
    } else {
      story.title = title;
      story.body = body;
      story.status = status;

      await story.save();

      req.flash("flashdata", {
        type: "success",
        message: "Success updating story",
      });
      res.redirect("/dashboard");
    }
  } catch (error) {
    req.flash("flashdata", {
      type: "danger",
      message: "Failed to adding story ",
    });
    res.redirect("/dashboard");
  }
};

// @desc  Delete Story
// @route DELET /stories/:id
exports.deleteStory = async (req, res) => {
  const storyId = req.params.id;
  try {
    const story = await StoryModel.findById(storyId);

    if (!story) {
      req.flash("flashdata", {
        type: "danger",
        message: "Story not found, Failed to delete story",
      });
      res.redirect("/dashboard");
      return;
    }
    if (story.user.toString() != req.user._id.toString()) {
      res.redirect("/dashboard");
      return;
    } else {
      await StoryModel.findByIdAndDelete(storyId);

      req.flash("flashdata", {
        type: "success",
        message: "Success deleting story",
      });
      res.redirect("/dashboard");
    }
  } catch (error) {
    res.statusCode(error?.statusCode || 500);
    next(new ErrorResponse(error?.statusCode || 500, error.message));
  }
};
