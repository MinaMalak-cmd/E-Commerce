import { Schema, Types, model } from "mongoose";

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "this is field is required"],
      minLength: 2,
      maxLength: 100,
      lowercase: true,
      trim: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      match: /^[A-Za-z0-9]+(?:_[A-Za-z0-9]+)*$/,
    },
    image: {
      secure_url: {
        type: String,
        required: false,
      },
      public_id: {
        type: String,
        required: false,
      },
    },
    createdBy: {
      type: Types.ObjectId,
      ref: "User",
      required: false, // TODO: convert into true after creating usermodel
    },
    customId: String,
  },
  {
    timestamps: true,
  }
);

const categoryModel = model("Category", categorySchema);

export default categoryModel;
