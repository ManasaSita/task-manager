// routes/taskRoutes.js
const express = require('express');
const Task = require('../models/Task');
const router = express.Router();

// Create a new task
router.post('/create', async (req, res) => {
    try {
        const { name, description, dueDate, status, priority, assignedTo } = req.body;
        const newTask = new Task({ name, description, dueDate, status, priority, assignedTo });
        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    } catch (error) {
        res.status(500).json({ error: 'Error creating task' });
    }
});

// Get all tasks
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find().populate('assignedTo', 'username email'); // Populate assigned user details
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching tasks' });
    }
});


// Update a task
router.put('/:id', async (req, res) => {
    // console.log(req);
    
    const { id } = req.params;
    const updates = req.body;
    try {
        const updatedTask = await Task.findByIdAndUpdate(id, updates, { new: true });
        res.json(updatedTask);
    } catch (error) {
        res.status(400).json({ error: 'Error updating task' });
    }
});

// Delete a task
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await Task.findByIdAndDelete(id);
        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting task' });
    }
});

// routes/taskRoutes.js
router.get('/filter', async (req, res) => {
    const { status, dueDate, priority, search } = req.query;
    let filterCriteria = {};

    if (status) filterCriteria.status = status;
    if (priority) filterCriteria.priority = priority;
    if (dueDate) filterCriteria.dueDate = { $lte: new Date(dueDate) };
    if (search) {
        filterCriteria.$or = [
            { name: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } }
        ];
    }

    try {
        const tasks = await Task.find(filterCriteria);
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Error filtering tasks' });
    }
});

// POST /api/tasks/:taskId/comments
router.post('/:taskId/comments', async (req, res) => {
    // console.log(req);
    
    try {
        const { taskId } = req.params;
        const { text, userId } = req.body;

        const task = await Task.findById(taskId);
        task.comments.push({ text, user: userId });
        await task.save();

        res.status(201).json(task.comments);
    } catch (error) {
        res.status(500).json({ message: 'Error adding comment', error });
    }
});

// GET /api/tasks/:taskId/comments
router.get('/:taskId/comments', async (req, res) => {
    try {
        const { taskId } = req.params;
        const task = await Task.findById(taskId).populate('comments.user', 'name');
        res.json(task.comments);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching comments', error });
    }
});

// Assign task to a user
router.put('/:id/assign', async (req, res) => {
    const { id } = req.params;
    const { userId } = req.body;

    try {
        const task = await Task.findByIdAndUpdate(id, { assignedTo: userId }, { new: true });
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: 'Error assigning task' });
    }
});

router.get('/:id', async (req, res) => {
    console.log(req.params);
    const { id } = req.params;

    try {
        const task = await Task.findById(id);
        console.log(task);
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching task' });
    }
})


module.exports = router;
