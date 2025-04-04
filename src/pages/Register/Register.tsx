import React, { useState } from 'react';
import { Modal, message as AntMessage } from 'antd';
import './Register.scss';
import validateEmail from '../../utils/validateEmail';
import authService from '../../services/authService';

const Register: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [country, setCountry] = useState<string>('Viet Nam');
  const [subscribe, setSubscribe] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    
    const emailError = validateEmail(value);
    if (!emailError) {
      setEmailError('');  
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const emailError = validateEmail(email);
    if (emailError) {
      setEmailError(emailError);
      return;
    }

    setIsLoading(true);

    try {
      const response = await authService.register({
        firstName,
        lastName,
        email,
        password,
      })
      setIsModalOpen(true);
    } catch (error:any) {
      const message =
        error?.response?.data?.message || error?.message || 'Failed to register. Please try again.';
        console.error('Register failed:', message);
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
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="text"
          value={email}
          onChange={handleEmailChange}
          placeholder="Enter your email"
        />
        {emailError && <p className="error">{emailError}</p>}

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
        />

<label htmlFor="firstName">First name</label>
        <input
          id="firstName"
          placeholder="optional"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <p className="note">So that we know what to call you if we email you.</p>

        <label htmlFor="lastName">Last name</label>
        <input
          id="lastName"
          placeholder="optional"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />

        <label htmlFor="country">Country or Region</label>
        <select
          id="country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        >
          <option value="Viet Nam">Viet Nam</option>
          <option value="United States">United States</option>
          <option value="Japan">Japan</option>
        </select>

        <div className="checkbox">
          <input
            type="checkbox"
            id="subscribe"
            checked={subscribe}
            onChange={() => setSubscribe(!subscribe)}
          />
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