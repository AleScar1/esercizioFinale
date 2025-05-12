// Importo le dipendenze necessarie per il progetto
import express, { application } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import userModel from '../models/users.js';
import passport from 'passport';


dotenv.config();
console.log("!!!!!!!!!!!!!!! Auth routes loaded !!!!!!!!!!!!!!! ");

const router = express.Router();
const saltRounds = +process.env.SALT_ROUNDS;
const jwtSecretKey = process.env.JWT_SECRET_KEY;

// Auth Routes
router.post('/register', async (req, res) => {
    try {
        const password = req.body.password;

        const user = new userModel({
            ...req.body,
            password: await bcrypt.hash(password, saltRounds)
        });

        const userSave = await user.save();
        return res.status(201).json(userSave);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Errore durante la registrazione' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        const userLogin = await userModel.findOne({ username });

        if (userLogin) {
            const log = await bcrypt.compare(password, userLogin.password);
            if (log) {
                const token = await generateToken({
                    id: userLogin.id,
                    username: userLogin.username,
                    fullname: userLogin.fullname,
                    email: userLogin.email
                });

                return res.status(200).json({ token });
            } else {
                return res.status(400).json({ message: 'Invalid Password!!' });
            }
        } else {
            return res.status(400).json({ message: 'Invalid Username!!' });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Errore durante il login' });
    }
});


// Google Auth Route 
router.get('/googlelogin', passport.authenticate("google", {scope: ["profile", "email"]}));

router.get('/callback', passport.authenticate("google", {session: false, failureRedirect: '/login'} ), (req, res, next) => {
    try {
        console.log('google callback')
        res.redirect(`/?accessToken=${req.user.accessToken}`)
    } catch (error) {
        console.log(error)
        next(error)
    }
})

//Google Auth Route  ok connessione 
router.get("/", (req, res) => {
  res.send("Login con Google ok");
});

// Funzione per creare il token JWT
const generateToken = (payload) => {
    return new Promise((res, rej) => {
        jwt.sign(payload, jwtSecretKey, { expiresIn: '1h' }, (err, token) => {
            if (err) rej(err);
            else res(token);
        });
    });
};

export default router;
