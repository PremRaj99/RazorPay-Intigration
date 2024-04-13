import { errorHandler } from "../utils/error.js";
import dotenv from "dotenv";

dotenv.config();

export const getKey = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(401, "Your are not allowed to get the key"));
  }

  try {
    const key = process.env.RAZORPAY_API_KEY;
    return res.status(200).json(key);
  } catch (error) {
    return next(error);
  }
};
