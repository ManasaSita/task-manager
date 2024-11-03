import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Comments from './Comments';

const TaskDetails = ({ task }) => {
    console.log(task);
    
    const [comments, setComments] = useState([]);
    const [currentTask, setCurrentTask] = useState(task);
    const [taskData, setTaskData] = useState({
        name: '',
        description: '',
        dueDate: '',
        priority: '',
        status: ''
    });
    const [isEditing, setIsEditing] = useState(false); // State to track edit form visibility
    const navigate = useNavigate();

    useEffect(() => {
        if (task) {
            setCurrentTask(task);
            setTaskData({
                name: task.name,
                description: task.description,
                dueDate: new Date(task.dueDate).toISOString().split('T')[0], // Format date to 'YYYY-MM-DD'
                priority: task.priority,
                status: task.status
            });
        }
    }, [task]);

    const handleStatusUpdate = async (status) => {
        try {
            const id = currentTask._id;
            const response = await axios.put(`/api/tasks/${id}`, { status });
            console.log(response.data);

            setCurrentTask((prevTask) => ({ ...prevTask, status: response.data.status }));
        } catch (error) {
            console.error('Error updating task status:', error);
        }
    };

    const handleCommentAdded = (newComment) => {
        setComments([...comments, newComment]);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTaskData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const id = currentTask._id;
            const response = await axios.put(`/api/tasks/${id}`, taskData);
            console.log('Task updated:', response.data);
            setCurrentTask(response.data);
            // Optionally reset the form after submission
            setTaskData({
                name: response.data.name,
                description: response.data.description,
                dueDate: new Date(response.data.dueDate).toISOString().split('T')[0],
                priority: response.data.priority,
                status: response.data.status
            });
            setIsEditing(false); // Close the form after saving
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    if (!currentTask) return <div>Loading task details...</div>;

    const possibleStatuses = {
        'Pending': ['In Progress', 'Completed'],
        'In Progress': ['Completed', 'Pending'],
        'Completed': ['Pending', 'In Progress'], // Assuming you can revert to "Pending"
    };

    const availableOptions = possibleStatuses[currentTask.status] || [];

    return (
        <div className="task-details">
            <h2>{currentTask.name}</h2>
            <p>Description: {currentTask.description}</p>
            <p>Due Date: {new Date(currentTask.dueDate).toLocaleDateString()}</p>
            <p>Status: {currentTask.status}</p>
            <p>Priority: {currentTask.priority}</p>
            
            {availableOptions.map((statusOption) => (
                <button key={statusOption} onClick={() => handleStatusUpdate(statusOption)}>
                    {statusOption}
                </button>
            ))}

            <button onClick={() => setIsEditing(!isEditing)}>
                {isEditing ? 'Cancel Edit' : 'Edit Task'}
            </button>

            {isEditing && (
                <div>
                    <h3>Edit Task</h3>
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
                        <input
                            type="date"
                            name="dueDate"
                            value={taskData.dueDate}
                            onChange={handleChange}
                        />
                        <select name="priority" value={taskData.priority} onChange={handleChange}>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                        <button type="submit">Save Task</button>
                    </form>
                </div>
            )}

            <Comments taskId={currentTask._id} />
        </div>
    );
};

export default TaskDetails;
