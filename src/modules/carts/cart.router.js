import { Router } from "express";
import * as cartController from "./controllers/cart.controller.js";
import { validation } from "../../../middlewares/validations/validation.js";
import handleAuth from "../../../middlewares/handleAuth.js";
// import * as cartValidators from "../../../middlewares/validations/cart.validation.js";

const router = Router();

router.post('/', handleAuth ,cartController.addToCart);
router.get('/',  cartController.getAllCarts);

export default router;
