import React, { useState } from 'react';
import MainNavbar from '../../navbars/MainNavbar';

const AuthForm = ({ onLogin, onRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isRegistering) {
      const userInfo = { username, password };
      onRegister(userInfo);
    } else {
      const credentials = { username, password };
      onLogin(credentials);
    }
  };

  return (
    <div>
      <MainNavbar/>
      <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="border p-4">
        <h2 className="mb-4">{isRegistering ? 'Register' : 'Login'}</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-3">
            <label className="form-label">Username:</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password:</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            {isRegistering ? 'Register' : 'Login'}
          </button>
          <button
            type="button"
            className="btn btn-secondary ms-2"
            onClick={() => setIsRegistering(!isRegistering)}
          >
            {isRegistering ? 'Switch to Login' : 'Switch to Register'}
          </button>
        </form>
      </div>
    </div>

    </div>
 
  );
};

export default AuthForm;
