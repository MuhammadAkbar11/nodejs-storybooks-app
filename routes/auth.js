const express = require("express");
const passport = require("passport");
const {
  getLogin,
  getGoogleAuthCallback,
  postLogout,
} = require("../controllers/auth.controller");

const router = express.Router();

// @desc Login
// @route GET /auth
router.get("/", getLogin);

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

// @desc Auth Logout
// @route POST /auth/logout
router.post("/logout", postLogout);

module.exports = router;
