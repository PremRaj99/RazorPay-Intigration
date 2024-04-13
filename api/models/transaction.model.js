import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      require: true,
    },
    price: {
      type: String,
      require: true,
    },
    productName: {
        type: String,
        require: true,
    },
    status: {
        type: String,
        require: true,
        default: "pending"
    },
    razorPayId: {
        type: String,
        require: true,
        unique: true,
    }
  },
  { timestamps: true }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
