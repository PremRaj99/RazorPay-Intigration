import mongoose from "mongoose";

const userDetailSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      require: true,
      unique: true,
    },
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    contact: {
        type: String,
        require: true,
    }
  },
  { timestamps: true }
);

const UserDetail = mongoose.model("UserDetails", userDetailSchema);

export default UserDetail;
