import { findBudgetByMonth } from "../models/budget.model.js"
import { findExpenseByMonth } from "../models/expense.model.js"
import type { BudgetMonth } from "../types/budget.types.js"

export async function getBudgetSummary(user_id: string, month: string): Promise < BudgetMonth | null > {
    const budget = await findBudgetByMonth(user_id, month)
    if (!budget) return null
    const total = await findExpenseByMonth(user_id, month)
    const total_spent = total?.totalExpense as number
    const budgetAmount = budget.amount as number
    const remaining =  budgetAmount - total_spent
    return { budget: { amount: budgetAmount,  month : month }, total_spent, remaining}
}