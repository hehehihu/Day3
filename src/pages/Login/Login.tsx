import { useState } from 'react';
import './Login.scss';

function Login() {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Logging in as: ${emailOrUsername}`);
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

        <button type="submit">Log in</button>
      </form>
    </div>
  );
}

export default Login;