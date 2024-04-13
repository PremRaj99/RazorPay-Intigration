import UserDetail from "../models/userDetail.js";
import { errorHandler } from "../utils/error.js";

export const getUserDetail = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(
      errorHandler(401, "Your are not allowed to get the deatails of this user")
    );
  }

  try {
    const userDetail = await UserDetail.findOne({ userId: req.params.userId });
    if (!userDetail) {
      return next(errorHandler(200, "User detail not found"));
    }
    return res.status(200).json(userDetail);
  } catch (error) {
    return next(error);
  }
};
