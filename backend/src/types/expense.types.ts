export type Expense = {
    id: string;
    user_id: string;
    category_id: string;
    amount: number;
    description?: string;
    date: string;
    created_at: Date;
    updated_at: Date;
};

export type CreateExpenseDTO = {
    user_id: string;
    category_id: string;
    amount: number;
    description?: string;
    date: string;
};

export type ExpenseResponse = {
    id: string;
    category_id: string;
    amount: number;
    description?: string;
    date: string;
};
