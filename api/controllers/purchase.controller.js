import Transaction from "../models/transaction.model.js";
import { errorHandler } from "../utils/error.js";
import { razorpayInstance } from "../utils/razorpay.js";

export const purchase = async (req, res, next) => {
  const { name, price } = req.body;

  if (req.user.id !== req.params.userId) {
    return next(
      errorHandler(403, "You are not allowed to purchase from this user.")
    );
  }

  try {
    const options = {
      amount: parseInt(price) * 100, // amount in the smallest currency unit
      currency: "INR",
    };
    const order = await razorpayInstance.orders.create(options);
    const newTransaction = new Transaction({
      userId: req.params.userId,
      price: price,
      productName: name,
      status: "pending",
      razorPayId: order.id,
    });
    await newTransaction.save();
    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
};

export const verifytransaction = async (req, res, next) => {
  // const { name, price, razorPayId } = req.body;

  try {
    console.log(req);
    // const updateTransaction = await Transaction.findOneAndUpdate(
    //   { razorPayId: razorPayId },
    //   { $set: { status: "complete" } },
    //   { new: true }
    // );
    res.status(200).json({ sucess: "true", body: req.body });
  } catch (error) {
    next(error);
  }
};
