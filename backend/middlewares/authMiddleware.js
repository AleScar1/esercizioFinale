import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import userModel from '../models/users.js';

dotenv.config();
const jwtSecretKey = process.env.JWT_SECRET_KEY;

// Middleware
const authMiddleware = async (req, res, next) => {
  try {
    const tokenBearer = req.headers.authorization;

    if (tokenBearer !== undefined) {
      const token = tokenBearer.replace('Bearer ', '');
      const data = await verifyJWT(token);

      if (data.exp) {
        const me = await userModel.findById(data.id);
        if (me) {
          req.user = me;
          return next();
        } else {
          return res.status(401).send('User not found!');
        }
      } else {
        return res.status(401).send('Please login again!');
      }
    } else {
      return res.status(401).send('Token required!');
    }

  } catch (err) {
    console.error(err);
    return res.status(401).send('Token error!');
  }
};

const verifyJWT = (token) => {
  return new Promise((res, rej) => {
    jwt.verify(token, jwtSecretKey, (err, data) => {
      if (err) rej(err);
      else res(data);
    });
  });
};

export default authMiddleware;
