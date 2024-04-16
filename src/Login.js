import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

export default function Login({ onLogin }) {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Make the HTTP POST request using Axios
      const response = await axios.post(`http://localhost:5000/auth/${userId}/${password}`);
      
      // Check the response from the server
      if (response.data.message === 'user authentication successful') {
        // If authentication successful, call onLogin with userId
        onLogin(userId);
      } else {
        // If authentication failed, set error message
        setError('Invalid user ID or password');
      }
    } catch (error) {
      // Handle error if request fails
      console.error('Error authenticating user:', error);
      setError('An error occurred while trying to authenticate. Please try again later.');
    }
  };

  return (
    <div id='LoginDiv'>
      <h2 id="login-header">Login</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div id="login-info">
          <label htmlFor="userId">User ID:</label>
          <input
            type="text"
            id="userId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </div>
        <div id="login-info2">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button id="login-button"type="submit">Login</button>
      </form>
      <p id="login-info3">Don't have an account? <Link to="/signup">Sign up</Link></p>
    </div>
  );
}
