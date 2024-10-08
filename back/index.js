


const mysql = require('mysql2/promise');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Créer une connexion à la base de données
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Route pour récupérer les tâches
app.get('/tasks', async (req, res) => {
    try {
        const [results] = await db.query('SELECT * FROM tasks');
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch tasks' });
    }
});

// Route pour ajouter une nouvelle tâche
app.post('/tasks', async (req, res) => {
    const { name, completed } = req.body;
    try {
        const [results] = await db.query('INSERT INTO tasks (name, completed) VALUES (?, ?)', [name, completed]);
        res.json({ id: results.insertId, name, completed });
    } catch (err) {
        res.status(500).json({ error: 'Failed to create task' });
    }
});

// Route pour mettre à jour une tâche
app.put('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    const { name, completed } = req.body;

    try {
        await db.query('UPDATE tasks SET name = ?, completed = ? WHERE id = ?', [name, completed, id]);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update task' });
    }
});

// Route pour supprimer une tâche
app.delete('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM tasks WHERE id = ?', [id]);
        res.sendStatus(200);
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete task' });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

