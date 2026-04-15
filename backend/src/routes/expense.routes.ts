import { Router } from "express";
import { registerExpense } from "../controller/expense.controller.js";

const router = Router();

router.post('/expenses', registerExpense);

export default router;