import axios from 'axios'

export const getBudgetByMonth = async (month: string) => {
    const token = localStorage.getItem('token')
    return await axios.get(`http://localhost:3000/api/v1/budgets/${month}`, {
        headers: { Authorization: `Bearer ${token}` }
    })
}
