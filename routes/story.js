const express = require("express");
const {
  getAddStory,
  postAddStory,
  getPublicStories,
  putEditStory,
  getEditStory,
  deleteStory,
  getSingleStory,
  getUserStories,
} = require("../controllers/story.controller");
const { ensureAuth } = require("../middleware/auth");
const createStorySchema = require("../middleware/storySchema");

const router = express.Router();

router.get("/", getPublicStories);

router
  .route("/add")
  .get(ensureAuth, getAddStory)
  .post(ensureAuth, [createStorySchema], postAddStory);
router.get("/edit/:id", ensureAuth, getEditStory);
router.get("/user/:id", getUserStories);
router
  .route("/:id")
  .get(getSingleStory)
  .put(ensureAuth, putEditStory)
  .delete(ensureAuth, deleteStory);
module.exports = router;
