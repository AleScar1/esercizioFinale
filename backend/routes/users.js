// Importo le dipendenze necessarie per il progetto
import express from 'express';
import userModel from '../models/users.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// Users Routes
router.get('/', (req, res) => {
    return res.status(200).json({ message: "Hello World!!" });
});

router.get('/users', authMiddleware, async (req, res) => {
    const allUsers = await userModel.find();
    return res.status(200).json(allUsers);
});

// Export Router con ES Modules
export default router;
