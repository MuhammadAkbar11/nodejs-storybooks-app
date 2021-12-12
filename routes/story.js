const express = require("express");
const {
  getAddStory,
  postAddStory,
} = require("../controllers/story.controller");
const { ensureAuth } = require("../middleware/auth");

const router = express.Router();

router
  .route("/add")
  .get(ensureAuth, getAddStory)
  .post(ensureAuth, postAddStory);

module.exports = router;
