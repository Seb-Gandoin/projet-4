import { useState, useEffect } from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskProgress from './components/TaskProgress';

function App() {
    const [tasks, setTasks] = useState([]);
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        document.body.className = theme;
        localStorage.setItem('theme', theme);
    }, [theme]);

    useEffect(() => {
        fetch('http://localhost:5000/tasks')
            .then(response => response.json())
            .then(data => setTasks(data))
            .catch(error => console.error('Error:', error));
    }, []);

    const addTask = (task) => {
        fetch('http://localhost:5000/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(task)
        })
        .then(response => response.json())
        .then(newTask => setTasks([...tasks, newTask]))
        .catch(error => console.error('Error:', error));
    };

    const updateTask = (id, updatedTask) => {
        fetch(`http://localhost:5000/tasks/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedTask)
        })
        .then(() => {
            setTasks(tasks.map(task => (task.id === id ? { ...task, ...updatedTask } : task)));
        })
        .catch(error => console.error('Error:', error));
    };

    const deleteTask = (id) => {
        fetch(`http://localhost:5000/tasks/${id}`, { method: 'DELETE' })
            .then(() => {
                setTasks(tasks.filter(task => task.id !== id));
            })
            .catch(error => console.error('Error:', error));
    };

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    const filteredTasks = tasks.filter(task => {
        if (filter === 'completed') return task.completed;
        if (filter === 'incomplete') return !task.completed;
        return true; // 'all'
    });

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <div className="App">
            <div className='app-navbar'>
                <div></div>
                <h1>To-Do List</h1>
                <button onClick={toggleTheme}>
                    {theme === 'light' ? 'sombre' : 'clair'}
                </button>
            </div>
            <TaskForm addTask={addTask} />
            <div className="filter-container">
                <label htmlFor="filter">Filtrer les tâches :</label>
                <select id="filter" value={filter} onChange={handleFilterChange}>
                    <option value="all">Toutes</option>
                    <option value="completed">Complètes</option>
                    <option value="incomplete">Incomplètes</option>
                </select>
            </div>
            <div className='app-flex'>
                <TaskList tasks={filteredTasks} updateTask={updateTask} deleteTask={deleteTask} />
                <TaskProgress tasks={filteredTasks} />
            </div>
        </div>
    );
}

export default App;

