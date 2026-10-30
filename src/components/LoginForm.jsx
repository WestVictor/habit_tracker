import { useState } from "react"
import { BASE_API_URL, LOGIN_API_ROUTE } from "../api-routes"
import { useNavigate } from "react-router-dom"
import { saveToken } from "../helper.js"

export default function LoginForm(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    async function onSubmit(e){
        e.preventDefault()
        setError("")

        if (!email.includes("@")){
            setError("Please enter a valid email")
            return
        }

        setLoading(true)
        try {
            const response = await fetch(`${BASE_API_URL}${LOGIN_API_ROUTE}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            })

            if (response.ok){
                const data = await response.json()
                
                saveToken(data.access_token)
                navigate("/dashboard")
            }
        } catch (error) {
            setError("There was an error.")
        } finally{
            setLoading(false)
        }
    }

    return(
        <form className="auth-form">
            <h2>Login</h2>

            <label htmlFor="email">Email</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />

            <label htmlFor="password">Password</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />

            <p className="form-error">{error}</p>

            <button className="btn btn-primary" onClick={onSubmit} disabled={loading}>{loading ? "Logging you in" : "Log in"}</button>
        </form>
    )
}