import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/api/auth/register', {
                username,
                email,
                password,
            });
            setSuccess('Registration successful!');
            setTimeout(() => {
                navigate('/dashboard'); // Redirect to dashboard after successful registration
            }, 2000);
        } catch (err) {
            setError('Error registering user. Please try again.');
        }
    };

    return (
        <div className="register-container">
            <h2>Task Manager - Register</h2>
            <form onSubmit={handleRegister}>
                <div>
                    <label>Username:</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {success && <p style={{ color: 'green' }}>{success}</p>}
                <button type="submit">Register</button>

                <div>Already have an account? <Link to="/login">Login Here</Link></div>
            </form>
        </div>
    );
};

export default Register;
