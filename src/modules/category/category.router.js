import { Router } from "express";
import * as categoryController from "./controllers/category.controller.js";

const router = Router();

router.post('/', categoryController.addCategory);

export default router;
