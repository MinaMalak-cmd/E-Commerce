import { Router } from "express";
import * as orderController from "./controllers/order.controller.js";
import { validation } from "../../../middlewares/validations/validation.js";
import handleAuth from "../../../middlewares/handleAuth.js";
// import * as orderValidators from "../../../middlewares/validations/order.validation.js";
import { systemRoles } from "../../utils/constants.js";

const router = Router();

// router.post('/', handleAuth, validation(orderValidators.addOrder), orderController.addOrder);
router.get('/',  orderController.getAllOrders);
// router.delete('/:id', handleAuth, validation(orderValidators.deleteOrder), orderController.deleteOrder);


export default router;
