import slugify from "slugify";
import cloudinary from "../../../utils/cloudinaryConfigurations.js";
import { SuccessResponse, asyncHandler } from "../../../utils/handlers.js";
import { generateRandomString } from "../../../utils/stringMethods.js";
import categoryModel from "../../../../DB/models/category.model.js";

// corner cases : check from file (if sent), check from createdBy if sent
// try create slug using hooks

export const addCategory = asyncHandler(async (req, res, next) => {

  let { name, createdBy } = req.body;
  name = name.toLowerCase();
  const exisitngCategory = await categoryModel.findOne({ name });
  if (exisitngCategory) {
    return next(
      new Error("Please enter different category name", { cause: 400 })
    );
  }
  if (!req.file) {
    return next(new Error("Please upload a category image", { cause: 400 }));
  }
  const slug = slugify(name, "_");
  const customId = generateRandomString();

  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";   
  const { public_id, secure_url } = await cloudinary.uploader.upload(
    req.file.path,
    {
      folder: `E-Commerce/Categories/${customId}`,
    }
    );
  const categoryObject = {
    name,
    slug,
    image: {
      secure_url,
      public_id,
    },
    customId,
  };
  const category = await categoryModel.create(categoryObject);
  if(!category){
    await cloudinary.uploader.destroy(public_id);
    return next(new Error("You can't add this resource", { cause: 404 }));
  }
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "1"; 
  return SuccessResponse(
    res,
    { message: "Category created successfully", statusCode: 230, category },
    201
  );
});

export const getAllCategories = asyncHandler(async (req, res, next) => {
  const categories = await categoryModel.find();
  // if(!category){
  //   await cloudinary.uploader.destroy(public_id);
  //   return next(new Error("You can't add this resource", { cause: 404 }));
  // }
  return categories ? SuccessResponse(res, { message: "Categories retrieved successfully", statusCode: 200, categories }, 200) : 
   next(new Error("Get All Categories", { cause: 400 }));
});
