import { useState } from "react"
import { login } from "../services/auth.services"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"


export function Login() {
    //sate
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const [error, setError] = useState('')
    const navigate = useNavigate()


    //comportements
    const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault()
        try {
            const response = await login(formData)
            console.log(response.data)
            localStorage.setItem('token', response.data.jwtToken)
            navigate('/dashboard')
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setError(err.response?.data)
            }
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }


    //render
    return <>
        <form onSubmit={handleSubmit}>
            <input name="email" type="email" onChange={handleChange} value={formData.email} />
            <input name="password" type="password" onChange={handleChange} value={formData.password} />
            <button>Connexion</button>
        </form>
        {error}
        <Link to="/register">Pas encore de compte ? S'inscrire</Link>
    </>
}

