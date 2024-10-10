// import { useState, useEffect } from 'react';
// import './App.css';
// import TaskForm from './components/TaskForm';
// import TaskList from './components/TaskList';
// import TaskProgress from './components/TaskProgress';  // Import du composant

// function App() {
//     const [tasks, setTasks] = useState([]);

//     useEffect(() => {
//         fetch('http://localhost:5000/tasks')
//             .then(response => response.json())
//             .then(data => setTasks(data))
//             .catch(error => console.error('Error:', error));
//     }, []);

//     const addTask = (task) => {
//         fetch('http://localhost:5000/tasks', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(task)
//         })
//         .then(response => response.json())
//         .then(newTask => setTasks([...tasks, newTask]))
//         .catch(error => console.error('Error:', error));
//     };

//     const updateTask = (id, updatedTask) => {
//         fetch(`http://localhost:5000/tasks/${id}`, {
//             method: 'PUT',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(updatedTask)
//         })
//         .then(() => {
//             setTasks(tasks.map(task => (task.id === id ? { ...task, ...updatedTask } : task)));
//         })
//         .catch(error => console.error('Error:', error));
//     };

//     const deleteTask = (id) => {
//         fetch(`http://localhost:5000/tasks/${id}`, { method: 'DELETE' })
//             .then(() => {
//                 setTasks(tasks.filter(task => task.id !== id));
//             })
//             .catch(error => console.error('Error:', error));
//     };

//     return (
//         <div className="App">
//             <h1>To-Do List</h1>
//             <TaskForm addTask={addTask} />
//             <div className='app-flex'>
//                 <TaskList tasks={tasks} updateTask={updateTask} deleteTask={deleteTask} />
//                 <TaskProgress tasks={tasks} />
//             </div>
//         </div>
//     );
// }

// export default App;


import { useState, useEffect } from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskProgress from './components/TaskProgress';

function App() {
    const [tasks, setTasks] = useState([]);
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');  // Charge le thème depuis le localStorage

    // Synchroniser la classe body avec le thème
    useEffect(() => {
        document.body.className = theme;  // Applique la classe 'light' ou 'dark' au body
        localStorage.setItem('theme', theme);  // Sauvegarde le thème dans le localStorage
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

    // Fonction pour basculer entre le thème clair et sombre
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
            <div className='app-flex'>
                <TaskList tasks={tasks} updateTask={updateTask} deleteTask={deleteTask} />
                <TaskProgress tasks={tasks} />
            </div>
        </div>
    );
}

export default App;
