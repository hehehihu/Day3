import React, { useState } from 'react';
import axios from 'axios';
import { message } from 'antd';
import './Login.scss';

const Login: React.FC = () => {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!emailOrUsername || !password) {
      message.error('Please fill in all fields.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post('https://dummyjson.com/auth/login', {
          emailOrUsername,
          password,
      })

      const { token, refreshToken } = response.data;

      sessionStorage.setItem('accessToken', token);
      sessionStorage.setItem('refreshToken', refreshToken);

      message.success('Login successful!');

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
          value={emailOrUsername}
          onChange={(e) => setEmailOrUsername(e.target.value)}
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