import type { Request, Response, NextFunction } from 'express';
import { validationBudget } from '../validator/budget.validator.js';
import { createBudget } from '../models/budget.model.js';
import { getBudgetSummary } from '../services/budget.service.js';

export const registerBudget = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = validationBudget.safeParse(req.body)
        if (!result.success) {
            return res.status(400).json('invalid data');
        } else {
            const userId = req.user.id
            const newBudget = await createBudget({ user_id: userId, amount: result.data.amount, month: result.data?.month })
            res.status(201).json(newBudget)
        }
    } catch (error) {
        next(error);
    }
}

export const getBudgetByMonth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user.id
        const getMonth = req.params.month as string
        const regexDAte = /^\d{4}-\d{2}$/
        if (!regexDAte.test(getMonth)) {
            return res.status(400).json('date format is invalid (expected : YYYY-MM)');
        }
        const summary = await getBudgetSummary(userId, getMonth)
        if (!summary) {
            return res.status(404).json('this budget doesn\' exist');
        } else {
            res.status(200).json(summary)
        }
    } catch (error) {
        next(error);
    }
}
