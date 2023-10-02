import productModel from "../../../../DB/models/product.model.js";
import { SuccessResponse, asyncHandler } from "../../../utils/handlers.js";
import categoryModel from "../../../../DB/models/category.model.js";
import subCategoryModel from "../../../../DB/models/subcategory.model.js";
import brandModel from "../../../../DB/models/brand.model.js";

export const addProduct = asyncHandler(async (req, res, next) => {
    let { title, desc, colors, sizes, price, appliedDiscount, stock } = req.body;
    const { categoryId, subCategoryId, brandId } = req.query;
    title = title.toLowerCase();
    if (!req.file) {
        return next(new Error("Please upload a brand image", { cause: 400 }));
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
    
});