import { useState } from "react"

export default function LoginForm(){
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

        console.log("Ready to send to the backend")
    }

    return(
        <form className="auth-form">
            <h2>Login</h2>

            <label htmlFor="email">Email</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />

            <label htmlFor="password">Password</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />

            <p className="form-error">{error}</p>

            <button className="btn btn-primary" onClick={onSubmit}>Log in</button>
        </form>
    )
}