import './TaskList.css';
import PropTypes from 'prop-types';
import { useState } from 'react';

function TaskList({ tasks, updateTask, deleteTask }) {
    const [editingTask, setEditingTask] = useState(null);
    const [newTaskName, setNewTaskName] = useState('');

    const handleEditClick = (task) => {
        setEditingTask(task);
        setNewTaskName(task.name); // Remplir le champ avec le nom de la tâche à éditer
    };

    const handleUpdateTask = (e) => {
        e.preventDefault();
        if (newTaskName.trim()) {
            updateTask(editingTask.id, { ...editingTask, name: newTaskName });
            setEditingTask(null); // Fermer le formulaire d'édition après la mise à jour
            setNewTaskName(''); // Réinitialiser le nom de la tâche
        }
    };

    return (
        <ul className="task-list">
            {tasks.map((task) => (
                <li key={task.id} className="task-item">
                    <input
                        id={`task-${task.id}`}
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => updateTask(task.id, { ...task, completed: !task.completed })}
                        className='task-input'
                    />
                    <label
                        htmlFor={`task-${task.id}`}
                        className='task-label'
                    >
                        {task.name}
                    </label>
                    <div>
                        <button onClick={() => handleEditClick(task)} className="edit-btn">
                            Modifier
                        </button>
                        <button onClick={() => deleteTask(task.id)} className="delete-btn">
                            Supprimer
                        </button>
                    </div>      
                </li>
            ))}
            {editingTask && (
                <form onSubmit={handleUpdateTask} className="edit-form">
                    <input
                        type="text"
                        value={newTaskName}
                        onChange={(e) => setNewTaskName(e.target.value)}
                        placeholder="Modifier la tâche"
                    />
                    <button type="submit">Mettre à jour</button>
                    <button type="button" onClick={() => setEditingTask(null)}>Annuler</button>
                </form>
            )}
        </ul>
    );
}

TaskList.propTypes = {
    tasks: PropTypes.array.isRequired,
    updateTask: PropTypes.func.isRequired,
    deleteTask: PropTypes.func.isRequired,
};

export default TaskList;
