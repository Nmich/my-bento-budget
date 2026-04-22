export type Expense = {
    id: string;
    amount: number;
    description: string;
    date: string;
    category_id: string;
    category_name: string;
}

export type ExpenseByCategory = {
    category_id: string;
    category_name: string;
    total: number;
}
