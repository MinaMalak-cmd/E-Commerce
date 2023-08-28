import slugify from "slugify";
import { SuccessResponse, asyncHandler } from "../../../utils/handlers.js";
import { generateRandomString } from "../../../utils/stringMethods.js";
import categoryModel from "../../../../DB/models/category.model.js";

// corner cases : check if name sent, check if it's duplicated, check from file (if sent), check from createdBy if sent
// then create request try create slug using hooks

export const addCategory = asyncHandler(async (req, res, next) => {
  let { name, createdBy } = req.body;
  name = name.toLowerCase();
  const exisitngCategory = await categoryModel.findOne({ name });
  if (exisitngCategory) {
    return next(
      new Error("please enter different category name", { cause: 400 })
    );
  }
  const slug = slugify(name, "_");
  const customId = generateRandomString();
  const categoryObject = {
    name,
    slug,
    // image: {
    //   secure_url,
    //   public_id,
    // },
    customId,
  };
  const category = await categoryModel.create(categoryObject);

  return category
    ? SuccessResponse(
        res,
        { message: "Category created successfully", statusCode: 230, category },
        201
      )
    : next(new Error("You can't add this resource", { cause: 404 }));
});
