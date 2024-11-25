import React, { useState, useContext } from 'react';
import '../css/LoginPage.css';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/api';
import { UserContext } from '../context/UserContext';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const handleLogin = async () => {
        if (!email || !password) {
            setErrorMessage('Email and password are required.');
            return;
        }

        if (!validateEmail(email)) {
            setErrorMessage('Please enter a valid email address.');
            return;
        }

        try {
            const data = await loginUser(email, password);
            setUser(data.user);
            setErrorMessage('');
            navigate('/');
        } catch (error) {
            setErrorMessage(error.message || 'An error occurred. Please try again.');
        }
    };

    return (
        <div className="login-container">

            <h2>Login</h2>
            <span>Email</span>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <span>Password</span>
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <button className="login-button" onClick={handleLogin}>
                Login
            </button>
            <a href="/signup" className="signup-link">Don't have an account? Sign up</a>
        </div>
    );
}
