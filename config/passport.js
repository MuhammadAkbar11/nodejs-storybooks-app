const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = require("../utils/contants");
const UserModel = require("../models/User");

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        const newUser = {
          googleId: profile.id,
          displayName: profile.displayName,
          firstName: profile.name?.familyName || profile.displayName,
          lastName: profile.name?.givenName || "",
          image: profile.photos[0]?.value,
        };

        try {
          const user = await UserModel.findOne({ googleId: profile.id });

          if (user) {
            done(null, user);
          } else {
            await UserModel.create(newUser);
            done(null, newUser);
          }
        } catch (error) {
          console.log(error);
          done(error, profile);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    UserModel.findById(id, function (err, user) {
      done(err, user);
    });
  });
};
