import type { Request, Response, NextFunction } from 'express';
import { validationExpense } from '../validator/expense.validator.js';
import { createExpense, findListExpenseByCategories, findListExpenseByMonth } from '../models/expense.model.js';

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

export const getExpensesByMonth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user.id
        const getMonth = req.params.month as string;
        const regexDate = /^\d{4}-\d{2}$/
        if (!regexDate.test(getMonth)) {
            return res.status(400).json('date format is invalid (expected : YYYY-MM)');
        }
        const listExpense = await findListExpenseByMonth(userId, getMonth)
        res.status(200).json(listExpense)
    } catch (error) {
        next(error);
    }
}

export const getExpensesByCategories = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user.id
        const getMonth = req.params.month as string;
        const regexDate = /^\d{4}-\d{2}$/
        if (!regexDate.test(getMonth)) {
            return res.status(400).json('date format is invalid (expected : YYYY-MM)');
        }
        const listExpenseByCategories = await findListExpenseByCategories(userId, getMonth)
        res.status(200).json(listExpenseByCategories)
    } catch (error) {
        next(error);
    }
}
