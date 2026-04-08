import React, { useState } from "react"
import { register } from "../services/auth.services"
import axios from "axios"

export function Register() {
  //sate
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  })

  const [error, setError] = useState('')

  //comportements
  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (formData.password === formData.confirmPassword) {
      try {
        await register(formData)
      } catch (err){
        if (axios.isAxiosError(err)) {
          setError(err.response?.data.error)
        }      }
    }
    else { setError("Password differents") }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }
  //render
  return <>
    <form onSubmit={handleSubmit}>
      <input name="email" type="email" onChange={handleChange} value={formData.email} />
      <input name="password" type="password" onChange={handleChange} value={formData.password} />
      <input name="confirmPassword" type="password" onChange={handleChange} value={formData.confirmPassword} />
      <button>Inscription</button>
    </form>
    {error}
  </>
}

