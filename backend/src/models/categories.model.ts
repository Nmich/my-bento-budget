import type { Category, CategoryResponse } from '../types/categories.type.js';
import getPool from './db.js';

export const findCategoryByUserId = async (user_id: string): Promise<Array<CategoryResponse>> => {
    const result = await getPool().query<CategoryResponse>(
        `SELECT id, type, name FROM categories WHERE user_id IS NULL OR user_id = $1`,
        [user_id]
    );

    return result.rows;
};