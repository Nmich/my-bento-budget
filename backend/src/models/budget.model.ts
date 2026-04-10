import type { Budget, CreateBudgetDTO, BudgetResponse } from '../types/budget.types.js';
import getPool from './db.js';

export const createBudget = async (data: CreateBudgetDTO): Promise<BudgetResponse> => {
    const result = await getPool().query<Budget>(
        `INSERT INTO budgets (user_id, amount, month)
    VALUES ($1, $2, $3)
    RETURNING id, amount, month`,
        [data.user_id, data.amount, data.month]
    );
    return result.rows[0] as BudgetResponse;
}

export const findBudgetByUserId = async (user_id: string): Promise<Budget | null> => {
    const result = await getPool().query<Budget>(
        `SELECT * FROM budgets WHERE user_id = $1`,
        [user_id]
    );

    return result.rows[0] ?? null;
};