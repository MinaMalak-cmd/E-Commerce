import mongoose, { Schema, Types, model } from "mongoose";

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: [true, "userName is required"],
      minLength: 2,
      lowercase: true,
      trim: true,
      unique: true,
    },
    email: {
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    age: Number,
    gender: {
      type: String,
      default: "male",
      enum: ["male", "female"],
    },
    cofirmEmail: {
      type: Boolean,
      default: false,
    },
    phone: String,
    isDeleted: {
      type: Boolean,
      default: false,
    },
    profile_pic: {
      secure_url: String,
      public_url: String,
    },
    cover_pictures: [
      {
        secure_url: String,
        public_id: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.models["User"] || model("User", userSchema);

export default userModel;
