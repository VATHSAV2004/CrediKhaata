// src/components/Auth/index.js
import { useAuth } from '../../context/AuthContext'; // Use the custom hook instead
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import './index.css';

const Auth = () => {
  const { login } = useAuth(); // Use the useAuth() hook
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password); // Call login function from context

    // After successful login, navigate to the dashboard
    if (localStorage.getItem('user')) {
      navigate('/dashboard'); // Navigate to dashboard page
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Auth;
