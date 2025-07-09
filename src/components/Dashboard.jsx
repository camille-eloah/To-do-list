import trashIcon from '../assets/lixeira.png';

// import Task from "./Task";
import "./Dashboard.css"
import { useState } from "react";

export default function Dashboard() {
    const [newTaskTitle, setNewTaskTitle] = useState("")
    const [lista, setLista] = useState([])

    const [newTaskDueDate, setNewTaskDueDate] = useState("")
    const [newTaskPriority, setNewTaskPriority] = useState("medium")
    const [showResetModal, setShowResetModal] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState(null);


    const handleDeleteTask = (id) => {
        setTaskToDelete(id);
    };

    const confirmDelete = () => {
        setLista(lista.filter(item => item.id !== taskToDelete));
        setTaskToDelete(null);
    };

    const cancelDelete = () => {
        setTaskToDelete(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault() // Evita que o formulário recarregue a página ao ser enviado
        if (!newTaskTitle) { 
            return
        } // Não permite adicionar tarefa sem nome

        //tarefa agora passa a ser um objeto. Com isso adiconamos o status e o seu id (função para gerar aleatória)
        const newTask = {
            id: Math.floor(Math.random() * 10000),
            texto: newTaskTitle,
            status: false,
            dueDate: newTaskDueDate,
            priority: newTaskPriority
        };

        setLista([...lista, newTask]) // Atualiza a lista de tarefas, adicionando a nova ao final do array existente
        
        // Limpa os campos do formulário, resentando para os valores padrão
        setNewTaskTitle('')
        setNewTaskDueDate('')
        setNewTaskPriority('medium')

        
    }

    //função para alterar o status da tarefa. Aqui optamos por trabalhar com dois estados: concluída ou não.
    const handleToggle = (id) => {
        setLista(lista.map(item =>
            item.id === id ? { ...item, status: !item.status } : item
        ))
    }

    //função mais 'complexa'. Aqui vamo reposicionar a tarefa no array lista de forma incremental.
    const handleMove = (id, direcao) => {

        //o método finIndex retorna o index do elemento que satisfaz alguma condição. Aqui estamos utilizando para
        //retornar o index do elemento que tem o id igual ao que foi passado para a função handleMove.
        //Perceba que aqui o index é diferente do id.

        const indice = lista.findIndex(item => item.id === id)

        //condições extraordinárias

        if ((indice === 0 && direcao === 'subir') || (indice === lista.length - 1 && direcao === 'descer')) {
            return;
        }

        const novaLista = [...lista]; //copia da lista original
        //splice modifica array, removendo ou inserindo elemento. Ele retorna o array modificado. Aqui está sendo removido 1 elementos na posição indice.
        //esse elemento removido é a saída de splice em forma de um novo array. A notação [0] é utilizada para indicar o primeiro elemento do array de retorno.
        //Por fim, itemMovido irá armazenar o elemento que precisa ser movido.
        const itemMovido = novaLista.splice(indice, 1)[0]

        //veririca em que sentido deve ser movido o item e faz o incremento ou decremento do seu indice.
        const novoIndice = direcao === 'subir' ? indice - 1 : indice + 1;

        //reposicionamento do elemento. Na posição novoIndice, remove-se 0 elementos e adiciona itemMovido
        novaLista.splice(novoIndice, 0, itemMovido)

        setLista(novaLista)
    }

    const handleClear = () => {
        setShowResetModal(true);
    };

    const confirmClear = () => {
        setLista([]);
        setShowResetModal(false);
    };

    const cancelClear = () => {
        setShowResetModal(false);
    };



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
                <input
                    type="date"
                    value={newTaskDueDate}
                    onChange={(e) => setNewTaskDueDate(e.target.value)}
                />
                <select
                    value={newTaskPriority}
                    onChange={(e) => setNewTaskPriority(e.target.value)}
                >
                    <option value="high">Alta</option>
                    <option value="medium">Média</option>
                    <option value="low">Baixa</option>
                </select>
                <button type="submit">Adicionar</button>
            </form>
            <button onClick={handleClear}>Reset</button>

            <div >

                <ul >
                    {lista.map((item, index) =>

                        <li key={item.id} className={`${item.status ? 'concluida' : ''} priority-${item.priority}`}>
                            <div className="controles-ordem">
                                <button
                                    onClick={() => handleMove(item.id, 'subir')}
                                    disabled={index === 0} // Desabilita o botão se for o primeiro item
                                    title="Mover para cima"
                                >
                                    ↑
                                </button>
                                <button
                                    onClick={() => handleMove(item.id, 'descer')}
                                    disabled={index === lista.length - 1} // Desabilita se for o último
                                    title="Mover para baixo"
                                >
                                    ↓
                                </button>
                            </div>
                            <div className="task-info">
                                <span className="task-title">{item.texto}</span>
                                <div className="task-meta">
                                    {item.dueDate && (
                                        <span className="due-date">
                                            <strong>Prazo:</strong> {new Date(item.dueDate).toLocaleDateString()}
                                        </span>
                                    )}
                                    <span className={`priority-badge priority-${item.priority}`}>
                                        {item.priority === 'high' ? 'Alta' :
                                            item.priority === 'medium' ? 'Média' : 'Baixa'}
                                    </span>
                                </div>
                            </div>
                            <button onClick={() => handleToggle(item.id)}>{item.status ? 'Desmarcar' : 'Concluir'}</button>
                            <button
                                onClick={() => handleDeleteTask(item.id)}
                                className="delete-task-button"
                                title="Apagar tarefa"
                            >
                                <img src={trashIcon} alt="Apagar" className="trash-icon" />
                            </button>
                        </li>

                    )}
                </ul>
                {showResetModal && (
                    <div className="modal-overlay">
                        <div className="modal">
                            <h3>Tem certeza que deseja resetar a lista?</h3>
                            <p>Todas as tarefas serão permanentemente removidas.</p>
                            <div className="modal-buttons">
                                <button onClick={confirmClear} className="confirm-button">Sim, resetar</button>
                                <button onClick={cancelClear} className="cancel-button">Cancelar</button>
                            </div>
                        </div>
                    </div>
                )}
                {taskToDelete && (
                    <div className="modal-overlay">
                        <div className="modal">
                            <h3>Tem certeza que deseja apagar esta tarefa?</h3>
                            <p>Esta ação não pode ser desfeita.</p>
                            <div className="modal-buttons">
                                <button onClick={confirmDelete} className="confirm-button">Sim, apagar</button>
                                <button onClick={cancelDelete} className="cancel-button">Cancelar</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>

    );

}