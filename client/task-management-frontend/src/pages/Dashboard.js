import React, { useState, useEffect } from 'react';
import TaskFilter from '../components/TaskFilter';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import TaskDetails from '../components/TaskDetails';
import axios from 'axios';
import { FaPlus, FaSlidersH, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);
    const [showTaskForm, setShowTaskForm] = useState(false);
    const [showFilter, setShowFilter] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get('https://task-manager-backend-86ss.onrender.com/api/tasks');
                setTasks(response.data);
                setFilteredTasks(response.data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        const fetchUsers = async () => {
            const response = await axios.get('https://task-manager-backend-86ss.onrender.com/api/auth/users');
            setUsers(response.data);
        };

        fetchTasks();
        fetchUsers();
    }, []);

    const addTask = async (taskData) => {
        try {
            const response = await axios.post('https://task-manager-backend-86ss.onrender.com/api/tasks/create', taskData);
            const newTask = response.data;
            const updatedTasks = [newTask, ...tasks];
            setTasks(updatedTasks);
            setFilteredTasks(updatedTasks);
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('authToken');  // Assuming you store the token in local storage
        navigate('/login');
    };

    const handleShowTaskForm = () => {
        setShowTaskForm(!showTaskForm);
        setSelectedTask(null);
    };

    const handleSelectTask = (task) => {
        setSelectedTask(task);
        setShowTaskForm(false);
    };

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1 className="app-name">Task Manager</h1>
                <div className="header-icons">
                    <button onClick={handleShowTaskForm} title="Add Task">
                        <FaPlus className="icon" />
                    </button>
                    <button onClick={() => setShowFilter(!showFilter)} title="Filter Tasks">
                        <FaSlidersH className="icon" />
                    </button>
                    <button onClick={handleLogout} title="Logout" className="logout-button">
                        <FaSignOutAlt className="icon" />
                    </button>
                </div>
            </header>

            <div className="dashboard-content">
                <div className="sidebar">
                    {showFilter && <TaskFilter setFilteredTasks={setFilteredTasks} />}
                    <TaskList tasks={filteredTasks} setSelectedTask={handleSelectTask} />
                </div>

                <div className="task-details-section">
                    {showTaskForm ? (
                        <TaskForm onSubmit={addTask} users={users} />
                    ) : selectedTask ? (
                        <TaskDetails task={selectedTask} />
                    ) : (
                        <p>Select a task to view details or click the plus icon to create a new task.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
