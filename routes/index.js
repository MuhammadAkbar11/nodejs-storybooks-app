const express = require("express");
const { getIndex, getDashboard } = require("../controllers/app.controller");

const router = express.Router();

// @desc Landing Page
// @route GET /
router.get("/", getIndex);

// @desc Dashboard
// @route GET /dashboard
router.get("/dashboard", getDashboard);

module.exports = router;
