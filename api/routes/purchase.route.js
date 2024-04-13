import express from 'express'
import { verifyToken } from '../utils/verifyUser.js';
import { purchase, verifytransaction } from '../controllers/purchase.controller.js';

const router = express.Router();

router.post('/:userId', verifyToken, purchase);
router.post('/verifytransaction/:userId', verifyToken, verifytransaction);

export default router;