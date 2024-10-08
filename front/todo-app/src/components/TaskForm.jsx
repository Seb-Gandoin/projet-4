import { useState } from 'react';
import PropTypes from 'prop-types';
import './TaskForm.css';


function TaskForm({ addTask }) {
    const [name, setName] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name.trim()) {                   
            addTask({ name: name.trim(), completed: false });
            setName('');                   
            setError('');                  
        } else {
            setError('Veuillez entrer une tâche valide.'); 
        }
    };

    return (
        <div className='task-form'>
            <form onSubmit={handleSubmit}>
                <label htmlFor="taskInput">Nouvelle tâche :</label>
                <input
                    id="taskInput"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ajouter une nouvelle tâche"
                    className='task-form-input'
                />
                <button type="submit" disabled={!name.trim()} className='task-form-btn'>Ajouter une tâche</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}  {/* Afficher un message d'erreur si besoin */}
            </form>
        </div>
    );
}

TaskForm.propTypes = {
    addTask: PropTypes.func.isRequired, 
};

export default TaskForm;
