const express = require("express");
const passport = require("passport");
const {
  getLogin,
  getGoogleAuthCallback,
  postLogout,
} = require("../controllers/auth.controller");
const { ensureGuest } = require("../middleware/auth");

const router = express.Router();

router.get("/", ensureGuest, getLogin);

// @desc Auth with Goole
// @route GET /auth/google
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    scope: ["profile"],
    failureRedirect: "/auth",
  }),
  getGoogleAuthCallback
);

router.post("/logout", postLogout);

module.exports = router;
