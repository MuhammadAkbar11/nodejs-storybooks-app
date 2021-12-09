const express = require("express");
const { getLogin } = require("../controllers/auth.controller");

const router = express.Router();

// @desc Login/Langing Page
// @route GET /
router.get("/", getLogin);

// @desc Dashboard
// @route GET /dashboard
router.get("/dashboard", (req, res) => {
  res.render("dashboard");
});

module.exports = router;
