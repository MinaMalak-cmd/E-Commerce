import { Router } from "express";
import * as couponController from "./controllers/coupon.controller.js";
import { validation } from "../../../middlewares/validations/validation.js";
import handleAuth from "../../../middlewares/handleAuth.js";
// import * as couponValidators from "../../../middlewares/validations/coupon.validation.js";

const router = Router();

// router.post('/', handleAuth, validation(couponValidators.addCart), couponController.addToCart);
router.post('/', couponController.addCoupon);
router.get('/',  couponController.getAllCoupons);

export default router;
