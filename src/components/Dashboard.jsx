import Task from "./Task"; 
import "./Dashboard.css" 
import { useState } from "react";
import dados from "./Dados";

export default function Dashboard () {
    const [tasks, setTasks] = useState(dados);
    const [newTaskTitle, setNewTaskTitle] = useState("");

    const deleteTask = (id) => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id)); 
    };

    const handleSubmit = (e) => {
        e.preventDefault(); 

        if (newTaskTitle.trim() === "") return; 

        const newTask = {
            id: Date.now(), 
            title: newTaskTitle.trim(), 
        };
        
        setTasks((prevTasks) => [...prevTasks, newTask]);
        setNewTaskTitle(""); 
    }

    return (

        <div className="dashboard">
            <h1>Lista de tarefas</h1>

            {/* Formulário de nova tarefa */}
            <form onSubmit={handleSubmit} className="form-task">
                <input
                    type="text"
                    placeholder="Digite uma nova tarefa"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                />
                <button type="submit">Adicionar</button>
            </form>

            <div className="task-list">
                {tasks.map((task) => (
                    <Task
                        key={task.id}
                        id={task.id}
                        name={task.title}
                        onDelete={deleteTask}
                    />
                ))}
            </div>
        </div>

    );

}