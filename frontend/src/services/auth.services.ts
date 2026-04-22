import axios from 'axios'

export const register = async (data: { email: string; password: string }) => {
    return await axios.post('http://localhost:3000/auth/register', { email: data.email, password: data.password })
}

export const login = async (data: { email: string; password: string }) => {
    return await axios.post('http://localhost:3000/auth/login', { email: data.email, password: data.password })
}
