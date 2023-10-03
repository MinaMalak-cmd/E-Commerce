import slugify from "slugify";
import productModel from "../../../../DB/models/product.model.js";
import { SuccessResponse, asyncHandler } from "../../../utils/handlers.js";
import { generateRandomString } from "../../../utils/stringMethods.js";
import categoryModel from "../../../../DB/models/category.model.js";
import subCategoryModel from "../../../../DB/models/subcategory.model.js";
import brandModel from "../../../../DB/models/brand.model.js";
import cloudinary from "../../../utils/cloudinaryConfigurations.js";

export const addProduct = asyncHandler(async (req, res, next) => {
    let { title, description, colors, sizes, price, appliedDiscount, stock } = req.body;
    const { categoryId, subCategoryId, brandId, createdBy } = req.query;
    title = title.toLowerCase();
    if (!req.files.length) {
        return next(new Error("Please upload product images", { cause: 400 }));
    }
    const isTitleDuplicated = await productModel.findOne({ title });
    if (isTitleDuplicated) {
        return next(new Error("Please enter different product name", { cause: 400 }));
    }
    const category = await categoryModel.findById(categoryId);
    if (!category) {
        return next(new Error("Category doesn't exist", { cause: 400 }));
    }
    const subCategory = await subCategoryModel.findById(subCategoryId);
    if (!subCategory) {
        return next(new Error("Sub Category doesn't exist", { cause: 400 }));
    }
    const brand = await brandModel.findById(brandId);
    if (!brand) {
        return next(new Error("Brand doesn't exist", { cause: 400 }));
    }
    const slug = slugify(title, {
        replacement: '_',
        lower:true,
        trim:true
    });
    const priceAfterDiscount = price * (1 - (appliedDiscount || 0) / 100)

    // Images
    const customId = generateRandomString();
    const customPath = `${brand.customPath}/Products/${customId}`;
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    const Images = [];
    req.imgPath = customPath;
    for(let file of req.files){
        const { public_id, secure_url } = await cloudinary.uploader.upload(
            file.path,
            {
            folder: customPath,
            }
        );
        Images.push({ public_id, secure_url });
    }
    // createdBy
    const productObject = {
        title,
        slug,
        description,
        price,
        priceAfterDiscount,
        appliedDiscount,
        stock,
        Images,
        customPath,
        colors,
        sizes,
        subCategoryId,
        categoryId,
        brandId,
      };
      const product = await productModel.create(productObject);
      if (!product) {
        await cloudinary.api.delete_resources_by_prefix(customPath);
        await cloudinary.api.delete_folder(customPath);
        return next(new Error("You can't add this resource", { cause: 500 }));
      }
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = "1";
      return SuccessResponse(
        res,
        { message: "Product created successfully", statusCode: 230, product },
        201
      );
});