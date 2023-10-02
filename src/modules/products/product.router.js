import { Router } from "express";
import * as productController from "./controllers/product.controller.js";
import { validation } from "../../../middlewares/validations/validation.js";
import * as productValidators from "../../../middlewares/validations/product.validation.js";
import { uploadCloudinary } from "../../services/uploadCloudinary.js";

const router = Router();

router.post('/', uploadCloudinary().single('image'), validation(productValidators.addProduct), productController.addProduct);
// router.put('/:id', uploadCloudinary().single('image'), validation(productValidators.updateProduct), productController.updateProduct);
// router.delete('/:id', validation(productValidators.deleteProduct), productController.deleteProduct);
// router.get('/',  productController.getAllProducts);

export default router;
