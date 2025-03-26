import { useState } from 'react';
import './Register.scss';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [country, setCountry] = useState('Viet Nam');
  const [subscribe, setSubscribe] = useState(false);
  const [emailError, setEmailError] = useState('');

  const validateEmail = (value: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setEmailError('Email is required');
    } else if (!validateEmail(email)) {
      setEmailError('Email is invalid');
    } else {
      setEmailError('');
      alert('Account created successfully!');
    }
  };

  return (
    <div className="register-container">
      <h1>Register</h1>
      <hr />
      <p><strong>New Customer? Please create an account.</strong></p>

      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        {emailError && <p className="error">{emailError}</p>}

        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <label>First name</label>
        <input placeholder="optional" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        <p className="note">So that we know what to call you if we email you.</p>

        <label>Last name</label>
        <input placeholder="optional" value={lastName} onChange={(e) => setLastName(e.target.value)} />

        <label>Country or Region</label>
        <select value={country} onChange={(e) => setCountry(e.target.value)}>
          <option value="Viet Nam">Viet Nam</option>
          <option value="United States">United States</option>
          <option value="Japan">Japan</option>
        </select>

        <div className="checkbox">
          <input type="checkbox" id="subscribe" checked={subscribe} onChange={() => setSubscribe(!subscribe)} />
          <label htmlFor="subscribe">
            <strong>Sign up to the Ableton newsletter to stay up to date with the latest special offers, tutorial videos, downloads, surveys and other news.</strong>
             It’s free and you can unsubscribe at any time. Further information is available in our <a href="#">Privacy Policy</a>.
          </label>
        </div>

        <button type="submit">Create account</button>
      </form>
    </div>
  );
}

export default Register;