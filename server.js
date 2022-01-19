const express = require('express');
const connection = require('./config');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.post('/api/todos', async(req, res) => {
    const { task } = req.body;
    if (!task) {
        return res.status(400).json({ error: 'You must provide a task' });
    }
    try {
        const insertQuery = 'INSERT INTO todos(task) VALUES(?);';
        const getTodoById = 'SELECT * FROM todos WHERE id = ?;';
        const [result, ] = await connection.query(insertQuery, [task]);
        const todosResult = await connection.query(getTodoById, [result.insertId]);
        res.json(todosResult[0]);
    } catch (e) {
        res.status(400).json(e);
    }
});
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));