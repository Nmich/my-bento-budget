import { Router } from "express";
import { getExpensesByMonth, registerExpense } from "../controller/expense.controller.js";

const router = Router();

router.post('/expenses', registerExpense);
router.get('/expenses/:month', getExpensesByMonth);

export default router;