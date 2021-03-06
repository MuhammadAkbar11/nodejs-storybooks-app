const mongoose = require("mongoose");
const { validationResult } = require("express-validator");
const paginate = require("../helpers/pagination");
const StoryModel = require("../models/Story");
const UserModel = require("../models/User");
const { consoleDev, rgx } = require("../utils");
const { NODE_ENV } = require("../utils/contants");
const ErrorResponse = require("../utils/error");
const errValidationMessage = require("../utils/errValidationMessage");

const ITEM_PER_PAGE = 9;

// @desc Show Add Story Page
// @route GET /stories/add
exports.getPublicStories = async (req, res, next) => {
  const { page, search } = req.query;

  const currPage = Number(page) || 1;
  const limit = ITEM_PER_PAGE;

  const searchRgx = rgx(search);

  const query = search
    ? {
        $or: [{ title: { $regex: searchRgx, $options: "i" } }],
      }
    : {};

  try {
    const count = await StoryModel.countDocuments({
      status: "public",
      ...query,
    });

    const stories = await StoryModel.find({ status: "public", ...query })
      .populate("user")
      .sort({ createdAt: "desc" })
      .limit(limit)
      .skip(limit * (currPage - 1))
      .lean();

    const pagination = paginate(currPage, limit, count);

    res.render("stories/index", {
      title: "Public Stories",
      path: "/stories",
      search: search || "",
      stories,
      ...pagination,
    });
  } catch (error) {
    const errRes = new ErrorResponse({
      name: error.name,
      statusCode: error.statusCode,
      message: error.message,
      ...error,
    });

    console.log("Ref Error", error.ReferenceError);
    next(errRes);
  }
};

// @desc Show user Stories
// @route GET /stories/user/:id
exports.getUserStories = async (req, res, next) => {
  const { page } = req.query;

  const currPage = Number(page) || 1;
  const limit = ITEM_PER_PAGE;

  const userID = req.params.id;

  try {
    const getUser = await UserModel.findOne({ _id: userID }).lean();

    if (!getUser) {
      return res.render("errors/404-user", {
        title: "User not found",
        path: "/stories/user/not",
      });
    }

    const count = await StoryModel.countDocuments({
      status: "public",
      user: getUser._id,
    });

    const stories = await StoryModel.find({
      status: "public",
      user: getUser._id,
    })
      .populate("user")
      .limit(limit)
      .skip(limit * (currPage - 1))
      .lean();

    const pagination = paginate(currPage, limit, count);

    return res.render("stories/user", {
      title: getUser.displayName,
      path: "/stories/user/",
      stories: stories,
      totalStories: count,
      user: getUser,
      ...pagination,
    });
  } catch (error) {
    const errRes = new ErrorResponse(error);
    res.status(404);
    next(errRes);
  }
};

// @desc Show Single Story
// @route GET /stories/:id
exports.getSingleStory = async (req, res, next) => {
  try {
    const story = await StoryModel.findById(req.params.id)
      .populate("user")
      .lean();

    if (!story) {
      res.status(404);
      throw new ErrorResponse({
        statusCode: 404,
        message: "Story not found",
      });
    }

    res.render("stories/single", {
      title: story.title,
      path: "/story",
      story,
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
      errors: null,
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

  const validate = validationResult(req);

  const validateMessage = errValidationMessage(validate.array());

  if (!validate.isEmpty()) {
    return res.status(422).render("stories/add", {
      title: "Add Story",
      path: "/stories/add",
      errors: validateMessage,
    });
  }
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
        message: "Story not found",
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
