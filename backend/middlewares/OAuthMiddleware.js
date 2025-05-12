import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import userModel from "../models/users.js";

dotenv.config();

const jwtSecretKey = process.env.JWT_SECRET_KEY;

passport.use("google", new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3001/auth/callback"
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const { email, name, given_name, family_name, email_verified } = profile._json;
        console.log("PROFILE: ", profile)
        let user = await userModel.findOne({ email });

        if (user) {
            console.log("Utente già presente nel DB");

            const token = jwt.sign({
                id: user.id,
                username: user.username,
                fullname: user.fullname,
                email: user.email
            }, jwtSecretKey, { expiresIn: '1h' });

            done(null, { accessToken: token,
                redirect: 'http://localhost:3000' });
        } else {
            const newUser = new userModel({
                username: given_name + family_name,
                fullname: name,
                email,
                password: '-',
                verified: email_verified
            });

            const createdUser = await newUser.save();

            const token = jwt.sign({
                id: createdUser.id,
                username: createdUser.username,
                fullname: createdUser.fullname,
                email: createdUser.email
            }, jwtSecretKey, { expiresIn: '1h' });

            done(null, { accessToken: token });
        }

    } catch (err) {
        done(err, null);
    }
}));
