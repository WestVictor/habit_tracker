import { useState } from "react"
import { BASE_API_URL, SIGN_UP_API_ROUTE } from "../api-routes.js"
import { useNavigate } from "react-router-dom"

export default function SignupForm(){
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

        if (password.length < 8){
            setError("Password must be at least 8 characters long")
            return
        }

        setLoading(true)
        try{
            const response = await fetch(`${BASE_API_URL}${SIGN_UP_API_ROUTE}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password})
            })
            if (response.ok){
                navigate("/login")
            }
        } catch(error){
            setError("There was an error. Try again later")
        } finally{
            setLoading(false)
        }
    }

    return(
        <form className="auth-form">
            <h2>Create an account</h2>

            <label htmlFor="email">Email</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />

            <label htmlFor="password">Password</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />

            <p className="form-error">{error}</p>

            <button className="btn btn-primary" onClick={onSubmit} disabled={loading}>{loading ? "Creating account..." : "Sign up"}</button>
        </form>
    )
}