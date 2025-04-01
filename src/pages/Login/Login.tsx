import React, { useState } from 'react';
import { message } from 'antd';
import './Login.scss';
import authService from '../../services/authService';
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      message.error('Please fill in all fields.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await authService.login({
          username,
          password,
      })

      const { token, refreshToken } = response.data;

      sessionStorage.setItem('accessToken', token);
      sessionStorage.setItem('refreshToken', refreshToken);

      message.success('Login successful!');

      navigate('/account'); 
    } catch (error: any) {
        console.error('Login failed:', error);
        message.error('Login failed. Please try again.');
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h1>Log in</h1>
      <hr />

      <div className="login-intro">
        <p><strong>Why do I need to log in?</strong></p>
        <p>
          To use any version of Live (including Live Lite or our free trial) you need an Ableton account.
          It takes less than a minute to create one, and even less to log in if you already have one.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <label>E-mail or username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <div className="password-label">
          <label>Password</label>
          <a href="#">Forgot password?</a>
        </div>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Log in'}
        </button>
      </form>
    </div>
  );
}

export default Login;