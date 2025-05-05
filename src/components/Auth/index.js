import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './index.css';

const Auth = () => {
  const { login } = useAuth(); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Both fields are required');
      return;
    }
    login(email, password);
    
    if (localStorage.getItem('user')) {
      navigate('/dashboard'); 
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2 className="auth-header">Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="auth-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="auth-input"
        />
        {error && <div className="error-message">{error}</div>}
        <button type="submit" className="auth-button">Login</button>
      </form>
      <div className="demo-credentials">
        
        <p>Try these credentials:</p>
        <p><strong>Email:</strong>credi@gmail.com</p>
        <p><strong>Password:</strong>Credi@156</p>
    
      </div>
    </div>
  );
};

export default Auth;
