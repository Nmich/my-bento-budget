import { Router } from "express";
import { getBudgetByMonth, registerBudget } from "../controller/budget.controller.js";

const router = Router();

router.post('/budgets', registerBudget);
router.get('/budgets/:month', getBudgetByMonth);

export default router;