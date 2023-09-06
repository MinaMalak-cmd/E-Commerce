import { Router } from "express";
import * as subCategoryController from "./controllers/subCategory.controller.js";
import { validation } from "../../../middlewares/validations/validation.js";
import * as categoryValidators from "../../../middlewares/validations/category.validation.js";
import { uploadCloudinary } from "../../services/uploadCloudinary.js";

const router = Router();

router.post('/', uploadCloudinary().single('image'), subCategoryController.addSubCategory);
// router.put('/:id', uploadCloudinary().single('image'), validation(categoryValidators.updateCategory), categoryController.updateCategory);
// router.delete('/:id', validation(categoryValidators.deleteCategory), categoryController.deleteCategory);
router.get('/',  subCategoryController.getAllSubCategories);

export default router;
