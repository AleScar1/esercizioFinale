// middlewares/OAuthMiddleware.js
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import userModel from "../models/users.js";
import dotenv from "dotenv";
dotenv.config();

passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3001/auth/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await userModel.findOne({ googleId: profile.id });

        if (!user) {
          user = await userModel.create({
            fullname: profile.displayName,
            email: profile.emails[0].value,
            googleId: profile.id,
          });
        }

        const customUser = {
          id: user._id,
          fullname: user.fullname,
          email: user.email,
          accessToken,
        };

        done(null, customUser);
      } catch (error) {
        done(error, null);
      }
    }
  )
);
