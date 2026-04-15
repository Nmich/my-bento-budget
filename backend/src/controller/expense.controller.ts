import type { Request, Response, NextFunction } from 'express';
import { validationExpense } from '../validator/expense.validator.js';
import { createExpense } from '../models/expense.model.js';

export const registerExpense = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = validationExpense.safeParse(req.body)
        if (!result.success) {
            return res.status(400).json('invalid data');
        } else {
            const userId = req.user.id
            const newExpense = await createExpense({ user_id: userId, category_id: result.data.category_id, amount: result.data.amount, description: result.data.description ?? '', date: result.data.date })
            res.status(201).json(newExpense)
        }
    } catch (error) {
        next(error);
    }
}
