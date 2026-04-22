import axios from "axios"

export const getExpensesByMonth = async(month: string)=>{
    const token = localStorage.getItem('token')
    return await axios.get(`http://localhost:3000/api/v1/expenses/${month}`, {
        headers: { Authorization: `Bearer ${token}` }
    })
}

export const getExpensesSummaryByMonth = async (month: string) => {
    const token = localStorage.getItem('token')
    return await axios.get(`http://localhost:3000/api/v1/expenses/summary/${month}`, {
        headers: { Authorization: `Bearer ${token}` }
    })
}
