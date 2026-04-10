import { Router } from "express";
import { registerBudget } from "../controller/budget.controller.js";

const router = Router();

router.post('/budgets', registerBudget);

export default router;