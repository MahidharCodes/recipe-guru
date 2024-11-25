import React, { useState, useContext } from 'react';
import { signupUser } from '../api/api';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

function SignupPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSignup = async () => {
    if (!username || !email || !password) {
      setErrorMessage('All fields are required.');
      return;
    }

    if (!validateEmail(email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }

    try {
      const data = await signupUser(username, email, password);
      setUser(data.user);
      navigate('/');
    } catch (error) {
      setErrorMessage(error.message || 'An error occurred. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <h2>Sign Up</h2>
      <span>Name</span>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
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
      <button className='login-button' onClick={handleSignup}>Sign Up</button>
      <a href="/login" className="signup-link">Already have an accout? Login</a>
    </div>
  );
}

export default SignupPage;
