const express = require("express");
const { getIndex, getDashboard } = require("../controllers/app.controller");
const { ensureAuth } = require("../middleware/auth");

const router = express.Router();

// @desc Landing Page
// @route GET /
router.get("/", getIndex);

// @desc Dashboard
// @route GET /dashboard
router.get("/dashboard", ensureAuth, getDashboard);

module.exports = router;
