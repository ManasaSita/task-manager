import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskFilter = ({ setFilteredTasks }) => {
    const [filters, setFilters] = useState({ status: '', priority: '', dueDate: '', search: '' });


    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get('https://task-manager-backend-86ss.onrender.com/api/tasks');
                setFilteredTasks(response.data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };
        fetchTasks();
    }, []);

    const handleChange = (e) => setFilters({ ...filters, [e.target.name]: e.target.value });

    const applyFilters = async () => {
        try {
            const response = await axios.get('https://task-manager-backend-86ss.onrender.com/api/tasks/filter', { params: filters });
            setFilteredTasks(response.data);  // Update filtered tasks in Dashboard
        } catch (error) {
            console.error('Error applying filters:', error);
        }
    };

    return (
        <div>
            <input type="text" name="search" placeholder="Search tasks" value={filters.search} onChange={handleChange} />
            <select name="status" value={filters.status} onChange={handleChange}>
                <option value="">All Status</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
            </select>
            <select name="priority" value={filters.priority} onChange={handleChange}>
                <option value="">All Priorities</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
            </select>
            <input type="date" name="dueDate" value={filters.dueDate} onChange={handleChange} />
            <button onClick={applyFilters}>Apply Filters</button>
        </div>
    );
};

export default TaskFilter;
