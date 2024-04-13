import express from "express";

import { verifyToken } from "../utils/verifyUser.js";
import { getKey } from "../controllers/razorPay.controller.js";

const router = express.Router();

router.get("/:userId", verifyToken, getKey);

export default router;
