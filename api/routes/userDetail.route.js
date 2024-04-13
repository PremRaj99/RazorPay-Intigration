import express from "express";

import { verifyToken } from "../utils/verifyUser.js";
import { getUserDetail } from "../controllers/userDetail.controller.js";

const router = express.Router();

router.get("/:userId", verifyToken, getUserDetail);

export default router;
