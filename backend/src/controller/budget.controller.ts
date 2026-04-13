import type { Request, Response, NextFunction } from 'express';
import { validationBudget } from '../validator/budget.validator.js';
import { createBudget } from '../models/budget.model.js';

export const registerBudget = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = validationBudget.safeParse(req.body)
        if (!result.success) {
            return res.status(400).json('invalid data');
        } else {
            const userId = req.user.id
            const newBudget = await createBudget({user_id: userId , amount: result.data.amount, month: result.data?.month })
            res.status(201).json(newBudget)
        }
    } catch (error) {
        next(error);
    }
}
