import { useState } from "react"; 
import "./Task.css" 

export default function Task({id, name, onDelete}) 
{
    const [status, setStatus] = useState('pendente') 

    const toggleTask = () => {
        setStatus((prev) => (prev === 'pendente' ? 'concluida' : 'pendente'))
    }; 

    const handleDelete = () => {
        onDelete(id);
    };

    return (
        <div className={status}>
            <div className="task-line">
                <h2>{name}</h2>
                <div className="acoes"> 
                    <button onClick={toggleTask}>
                    {status === "concluida" ? "Desmarcar" : "Concluir"}
                    </button>
                    <button onClick={handleDelete} className="delete-button">
                        Apagar 
                    </button>
                </div>
            </div>
        </div>
    ); 
}