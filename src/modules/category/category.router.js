import { Router } from "express";
import * as categoryController from "./controllers/category.controller.js";
import { validation } from "../../../middlewares/validations/validation.js";
import * as categoryValidators from "../../../middlewares/validations/category.validation.js";

const router = Router();

router.post('/', validation(categoryValidators.addCategory), categoryController.addCategory);

export default router;
