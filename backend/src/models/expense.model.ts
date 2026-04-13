import type { Expense, CreateExpenseDTO, ExpenseResponse } from '../types/expense.types.js';
import getPool from './db.js';

export const createExpense = async (data: CreateExpenseDTO): Promise<ExpenseResponse> => {
    const result = await getPool().query<Expense>(
        `INSERT INTO expenses (user_id, category_id, amount, description, date)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id, category_id, amount, description, date`,
        [data.user_id, data.category_id, data.amount, data.description, data.date]
    );
    return result.rows[0] as ExpenseResponse;
}

export const findExpenseByUserId = async (user_id: string): Promise<Expense | null> => {
    const result = await getPool().query<Expense>(
        `SELECT * FROM expenses WHERE user_id = $1`,
        [user_id]
    );

    return result.rows[0] ?? null;
};