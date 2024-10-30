// app.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

const taskRoutes = require('./routes/taskRoutes');
app.use('/api/tasks', taskRoutes);

// Routes (Placeholder for now)
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => res.send('Task Management API is running'));

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
    .catch(err => console.error(err));
