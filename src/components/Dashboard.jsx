import { useState } from "react"

export default function Dashboard(){
    const [habits, setHabits] = useState([
        { id: 1, name: "Drink water", done: false },
        { id: 2, name: "Read for 1 hour", done: true }
    ])
    const [newHabit, setNewHabit] = useState("")

    const doneCount = habits.filter((el) => el.done).length

    function addHabit(e){
        e.preventDefault()
        
        if (newHabit.trim() === "") return
        const habit = { id: Date.now(), name: newHabit.trim(), done: false }

        setHabits([...habits, habit])
        setNewHabit("")
    }

    function toggleHabit(id){
        setHabits(habits.map((el) => (el.id === id ? {...el, done: !el.done} : el)))
    }

    function deleteHabit(id){
        setHabits(habits.filter((el) => el.id !== id))
    }

    return(
        <div className="container dashboard">
            <h1>My Habits</h1>
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
                                <button onClick={() => toggleHabit(el.id)}>{el.done ? "Undo" : "Done"}</button>
                                <button onClick={() => deleteHabit(el.id)}>Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>
            }
        </div>
    )
}