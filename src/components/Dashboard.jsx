import { useState, useEffect } from "react"
import { clearToken, getToken } from "../helper"
import { useNavigate } from "react-router-dom"
import { BASE_API_URL, HABITS_API_ROUTE, HABIT_BY_ID_API_ROUTE } from "../api-routes"

export default function Dashboard(){
    const [habits, setHabits] = useState([])
    const [newHabit, setNewHabit] = useState("")
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const navigate = useNavigate()
    const token = getToken()

    const doneCount = habits.filter((el) => el.done).length

    useEffect(() => {
        if (token === null){
            navigate("/login")
            return
        }
        loadHabits()
    }, [])

    async function loadHabits(){
        try {
            const response = await fetch(`${BASE_API_URL}${HABITS_API_ROUTE}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })

            if (response.ok){
                const data = await response.json()
                setHabits(data.data)
            }
        } catch (error) {
            console.log(error)
        } finally{
            setLoading(false)
        }
    }

    async function addHabit(e){
        e.preventDefault()
        
        if (newHabit.trim() === "") return

        try {
            const response = await fetch(`${BASE_API_URL}${HABITS_API_ROUTE}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ name: newHabit })            
            })

            if (response.ok){
                const data = await response.json()
                const habit = data.data

                setHabits([...habits, habit])
                setNewHabit("")
            }
        } catch (error) {
            setError("There was an error. Try again later.")
        }
    }

    async function deleteHabit(id){
        try {
            const response = await fetch(`${BASE_API_URL}${HABIT_BY_ID_API_ROUTE(id)}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            if (response.ok){
                loadHabits()
            }
            
        } catch (error) {
            setError("There was an error")
        }
    }

    function logout(){
        clearToken()
        navigate("/login")
    }

    return(
        <div className="container dashboard">
            <h1>My Habits</h1>
            <button onClick={logout}>Log out</button>
            <p>{doneCount} of {habits.length} habits done today</p>

            <form className="add-form">
                <input type="text" value={newHabit} onChange={(e) => setNewHabit(e.target.value)} placeholder="New habit" />

                <button className="btn btn-primary" onClick={addHabit}>Add</button>
            </form>

            {habits.length === 0 
                ? 
                <p className="empty">No habits yet</p> 
                : 
                <ul className="habit-list">
                    {habits.map((el) => (
                        <li key={el.id} className={el.done === true ? "habit done" : "habit"}>
                            <span>{el.name}</span>
                            <div>
                                <button onClick={() => deleteHabit(el.id)}>Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>
            }
        </div>
    )
}