import { useEffect, useState } from "react";
import { getBudgetByMonth } from "../services/budget.services";
import { getExpensesByMonth, getExpensesSummaryByMonth } from "../services/expense.services";
import type { BudgetData } from "../types/budget.types";
import type { Expense, ExpenseByCategory } from "../types/expense.types";
import axios from "axios";

export default function Dashboard() {
    const dateformat = new Date().toISOString().slice(0, 7)

    const [currentMonth, setCurrentMonth] = useState<string>(dateformat);
    const [budgetData, setBudgetData] = useState<BudgetData | null>(null);
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [expensesCategory, setExpensesCategory] = useState<ExpenseByCategory[]>([]);
    const [error, setError] = useState('')

    const currentDate = new Date(currentMonth).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })

    useEffect(() => {
        async function fetchData() {
            try {
                //reset
                setBudgetData(null)
                setExpenses([])
                setExpensesCategory([])
                //appels API
                const resultBudget = await getBudgetByMonth(currentMonth)
                const resultExpense = await getExpensesByMonth(currentMonth)
                const resultCategory = await getExpensesSummaryByMonth(currentMonth)
                //setState
                setBudgetData(resultBudget.data)
                setExpenses(resultExpense.data)
                setExpensesCategory(resultCategory.data)
            } catch (err) {
                if (axios.isAxiosError(err)) {
                    setError(err.response?.data)
                }
            }
        }
        fetchData()
    }, [currentMonth])

    const expensesItems = expenses.map(expense =>
        <li key={expense.id}>
            {expense.date} - {expense.category_name} - {expense.amount} - {expense.description}
        </li>)

    const expensesCategoryItems = expensesCategory.map(category =>
        <li key={category.category_id}>
            {category.category_name} - {category.total}
        </li>)

    return (
        <>
            <div>{currentDate}</div>
            {budgetData && (
                <>
                    <div>{budgetData.budget.amount}</div>
                    <div>{budgetData.total_spent}</div>
                    <div>{budgetData.remaining}</div>
                </>
            )}
            {!budgetData && <div>il n'y a aucun budget pour ce mois</div>}
            <ul>{expensesItems}</ul>
            <ul>{expensesCategoryItems}</ul>
            {error}
        </>
    )
}


