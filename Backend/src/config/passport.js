import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/User.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;

        // 1. Check if user already exists with this googleId
        let user = await User.findOne({ googleId: profile.id });
        if (user) {
          if (user.isBlocked) {
            return done(null, false, { message: "Account is blocked" });
          }
          return done(null, user);
        }

        // 2. Check if user exists with same email (linked local account)
        user = await User.findOne({ email });
        if (user) {
          if (user.isBlocked) {
            return done(null, false, { message: "Account is blocked" });
          }
          // Link Google to existing account
          user.googleId = profile.id;
          user.authProvider = "google";
          user.isEmailVerified = true; // Google emails are pre-verified
          if (!user.profilePhoto && profile.photos?.[0]?.value) {
            user.profilePhoto = profile.photos[0].value;
          }
          await user.save();
          return done(null, user);
        }

        // 3. Create brand new user
        const newUser = await User.create({
          name: profile.displayName,
          email,
          googleId: profile.id,
          authProvider: "google",
          isEmailVerified: true, // Google verifies emails
          profilePhoto: profile.photos?.[0]?.value || null,
          password: null,
        });

        return done(null, newUser);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

// Not using sessions, but passport requires these
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

export default passport;