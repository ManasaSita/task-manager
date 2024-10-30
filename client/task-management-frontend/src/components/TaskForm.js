import React, { useState } from 'react';

const TaskForm = ({ onSubmit,users, initialData = {} }) => {
    // console.log(initialData);
    
    const [taskData, setTaskData] = useState({
        name: initialData.name || '',
        description: initialData.description || '',
        dueDate: initialData.dueDate || '',
        priority: initialData.priority || 'Medium',
        status: initialData.status || 'Pending',
        // assignedTo: initialData.assignedTo.username || 'Unassigned'
    });

    const handleChange = (e) => setTaskData({ ...taskData, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(taskData);
        setTaskData({
            name: '',
            description: '',
            dueDate: '',
            priority: 'Medium',
            status: 'Pending',
            // assignedTo: 'Unassigned'
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="name"
                value={taskData.name}
                onChange={handleChange}
                placeholder="Task Name"
                required
            />
            <textarea
                name="description"
                value={taskData.description}
                onChange={handleChange}
                placeholder="Description"
            />
            <input type="date" name="dueDate" value={taskData.dueDate} onChange={handleChange} />
            <select name="status" value={taskData.status} onChange={handleChange}>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
            </select>
            {/* <select name="assignedTo" value={taskData.assignedTo} onChange={handleChange}>
                <option value="">Assign to...</option>
                {users.map(user => (
                    <option key={user._id} value={user._id}>
                        {user.username} ({user.email})
                    </option>
                ))}
            </select> */}
            <select name="priority" value={taskData.priority} onChange={handleChange}>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
            </select>
            <button type="submit">Save Task</button>
        </form>
    );
};

export default TaskForm;
