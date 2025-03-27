import React, { useState } from 'react';
import axios from 'axios';
import { Modal, message as AntMessage } from 'antd';
import './Register.scss';
import validateEmail from '../../utils/validateEmail';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [country, setCountry] = useState('Viet Nam');
  const [subscribe, setSubscribe] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const emailError = validateEmail(email);
    if (emailError) {
      setEmailError(emailError);
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post('https://dummyjson.com/docs/users#users-add', {
        firstName,
        lastName,
        email,
        password,
      })
      console.log('Register success:', response.data);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Register failed:', error);
      AntMessage.error('Failed to register. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleModalOk = () => {
    setIsModalOpen(false);
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

        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Creating account...' : 'Create account'}
        </button>
      </form>

      <Modal
        title="Account created successfully!"
        open={isModalOpen}
        onOk={handleModalOk}
        onCancel={() => setIsModalOpen(false)}
        okText="OK"
      >
        <p>Account created successfully!</p>
      </Modal>
    </div>
  );
}

export default Register;