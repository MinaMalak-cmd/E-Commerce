import { Router } from "express";
import * as categoryController from "./controllers/category.controller.js";
import { validation } from "../../../middlewares/validations/validation.js";
import * as categoryValidators from "../../../middlewares/validations/category.validation.js";
import { uploadCloudinary } from "../../services/uploadCloudinary.js";

const router = Router();

// router.post('/', validation(categoryValidators.addCategory), uploadCloudinary().single('image'), categoryController.addCategory);
router.post('/', uploadCloudinary().single('image'), categoryController.addCategory);
router.get('/', categoryController.getAllCategories);

export default router;
