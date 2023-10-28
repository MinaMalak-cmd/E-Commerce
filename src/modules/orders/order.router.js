import { Router } from "express";
import * as orderController from "./controllers/order.controller.js";
import { validation } from "../../../middlewares/validations/validation.js";
import handleAuth from "../../../middlewares/handleAuth.js";
// import * as orderValidators from "../../../middlewares/validations/order.validation.js";
import { systemRoles } from "../../utils/constants.js";
import handleUserRole from "../../../middlewares/handleUserRole.js";

const router = Router();

router.post('/', handleAuth, handleUserRole([systemRoles.USER]), orderController.addOrder);
router.get('/', handleAuth, handleUserRole([systemRoles.VENDOR, systemRoles.SUPER_ADMIN]), orderController.getAllOrders);
// router.delete('/:id', handleAuth, validation(orderValidators.deleteOrder), orderController.deleteOrder);


export default router;
