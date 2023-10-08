import { Router } from "express";
import * as authController from "./controllers/auth.js";
import * as validators from "../../../middlewares/validations/auth.validation.js";
import { validation } from "../../../middlewares/validations/validation.js";

const router = Router();

router.post("/signup", validation(validators.signup), authController.signup);


export default router;