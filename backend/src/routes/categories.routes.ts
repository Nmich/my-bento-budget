import { Router } from "express";
import { getCategories } from "../controller/categories.controller.js";

const router = Router();

router.get('/categories', getCategories);

export default router;