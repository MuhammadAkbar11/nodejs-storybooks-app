const express = require("express");
const passport = require("passport");
const {
  getLogin,
  getGoogleAuthCallback,
} = require("../controllers/auth.controller");

const router = express.Router();

// @desc Login/Langing Page
// @route GET /
router.get("/auth", getLogin);

// @desc Auth with Goole
// @route GET /auth/google
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile"],
  })
);

// @desc Auth with Goole
// @route GET /auth/google/callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    scope: ["profile"],
    failureRedirect: "/auth",
  }),
  getGoogleAuthCallback
);

module.exports = router;
