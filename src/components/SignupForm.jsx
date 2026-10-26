import { useState } from "react"

export default function SignupForm(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    function onSubmit(e){
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

        console.log("Ready to send to the backend")
    }

    return(
        <form className="auth-form">
            <h2>Create an account</h2>

            <label htmlFor="email">Email</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />

            <label htmlFor="password">Password</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />

            <p className="form-error">{error}</p>

            <button className="btn btn-primary" onClick={onSubmit}>Sign up</button>
        </form>
    )
}