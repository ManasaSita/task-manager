const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    name: String,
    description: String,
    dueDate: Date,
    status: String,
    priority: String,
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    comments: [
        {
            text: String,
            user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            timestamp: { type: Date, default: Date.now }
        }
    ],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Task', taskSchema);
