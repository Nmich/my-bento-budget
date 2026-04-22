import type {
    Expense,
    CreateExpenseDTO,
    ExpenseResponse,
    ExpenseItem,
    ExpenseByCategoryItem
} from '../types/expense.types.js';
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

export const findTotalExpenseByMonth = async (user_id: string, month: string): Promise<{ totalexpense: number } | null> => {
    const result = await getPool().query<{ totalexpense: number }>(
        `SELECT SUM(amount) as totalExpense 
        FROM expenses 
        WHERE user_id = $1 AND TO_CHAR(date, 'YYYY-MM') = $2`,
        [user_id, month]
    );
    return result.rows[0] ?? null;
};

export const findListExpenseByMonth = async (user_id: string, month: string): Promise<ExpenseItem[]> => {
    const result = await getPool().query<ExpenseItem>(
        `SELECT
            expenses.id, CAST(amount AS FLOAT) AS amount, description, date, category_id, name AS category_name
        FROM expenses
        INNER JOIN categories ON expenses.category_id = categories.id
        WHERE expenses.user_id = $1 AND TO_CHAR(date, 'YYYY-MM') = $2
        ORDER BY date DESC`,
        [user_id, month]
    );
    return result.rows;
};

export const findListExpenseByCategories = async (user_id: string, month: string): Promise<ExpenseByCategoryItem[]> => {
    const result = await getPool().query<ExpenseByCategoryItem>(
        `SELECT
            category_id, name AS category_name, CAST(SUM(amount) AS FLOAT) AS total
        FROM expenses
        INNER JOIN categories ON expenses.category_id = categories.id
        WHERE expenses.user_id = $1 AND TO_CHAR(date, 'YYYY-MM') = $2
        GROUP BY category_id, category_name`,
        [user_id, month]
    );
    return result.rows;
};