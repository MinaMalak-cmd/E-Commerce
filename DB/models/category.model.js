import { Schema, model } from "mongoose";

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
      match: /^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$/,
    },
    image: {
      secure_url: String,
      public_id: String,
    },
    createdBy: {
      type: ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const categoryModel = model("Category", categorySchema);

export default categoryModel;
