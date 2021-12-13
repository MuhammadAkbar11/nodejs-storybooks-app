const express = require("express");
const {
  getAddStory,
  postAddStory,
  getPublicStories,
} = require("../controllers/story.controller");
const { ensureAuth } = require("../middleware/auth");

const router = express.Router();

router.get("/", ensureAuth, getPublicStories);
router
  .route("/add")
  .get(ensureAuth, getAddStory)
  .post(ensureAuth, postAddStory);

module.exports = router;
