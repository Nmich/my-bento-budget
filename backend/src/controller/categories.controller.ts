import type { Request, Response, NextFunction } from 'express';
import { findCategoryByUserId } from "../models/categories.model.js";

export const getCategories = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user.id
        const listCategories = await findCategoryByUserId(userId)
        res.status(200).json({ list: listCategories })
    } catch (error) {
        next(error);
    }
}

