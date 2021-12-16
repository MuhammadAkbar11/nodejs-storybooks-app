const express = require("express");
const {
  getAddStory,
  postAddStory,
  getPublicStories,
  putEditStory,
  getEditStory,
  deleteStory,
} = require("../controllers/story.controller");
const { ensureAuth } = require("../middleware/auth");

const router = express.Router();

router.get("/", getPublicStories);
router
  .route("/:id")
  .put(ensureAuth, putEditStory)
  .delete(ensureAuth, deleteStory);
router
  .route("/add")
  .get(ensureAuth, getAddStory)
  .post(ensureAuth, postAddStory);
router.get("/edit/:id", ensureAuth, getEditStory);

module.exports = router;
