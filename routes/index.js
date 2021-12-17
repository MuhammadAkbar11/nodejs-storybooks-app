const express = require("express");
const {
  getIndex,
  getDashboard,
  getAbout,
  getContact,
} = require("../controllers/app.controller");
const { ensureAuth } = require("../middleware/auth");

const router = express.Router();

router.get("/", getIndex);
router.get("/dashboard", ensureAuth, getDashboard);
router.get("/about", getAbout);
router.get("/contact", getContact);
module.exports = router;
