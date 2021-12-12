const express = require("express");
const { getIndex, getDashboard } = require("../controllers/app.controller");
const { ensureAuth } = require("../middleware/auth");

const router = express.Router();

router.get("/", getIndex);
router.get("/dashboard", ensureAuth, getDashboard);

module.exports = router;
