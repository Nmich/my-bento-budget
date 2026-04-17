export type Budget = {
    id: string;
    user_id: string;
    amount: number;
    month: string;
    created_at: Date;
};

export type CreateBudgetDTO = {
    user_id: string;
    amount: number;
    month: string;
};

export type BudgetResponse = {
    id: string;
    amount: number;
    month: string;
};

export type BudgetMonth = {
    budget: {
        amount: number,
        month: string;
    }
    total_spent: number;
    remaining: number;
};
