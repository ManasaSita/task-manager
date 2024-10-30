import React, { useState } from 'react';

const TaskList = ({ tasks, setSelectedTask  }) => {    

    const sortedTasks = [...tasks].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return (
        <div className="task-list">
            {tasks.map(task => (
                <div
                    key={task._id}
                    className="task-title"
                    onClick={() => setSelectedTask(task)}
                >
                    {task.name}
                </div>
            ))}
        </div>
    );
};

export default TaskList;
