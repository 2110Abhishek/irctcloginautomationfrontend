// client/src/App.js
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('⏳ Sending request...');

    try {
      const res = await axios.post('http://localhost:5000/api/login', {
        username,
        password,
      });
      setMessage(res.data.message);
    } catch (err) {
      setMessage('❌ Login failed. Check console.');
      console.error(err);
    }
  };

  return (
    <div className="App">
      <h2>🚂 IRCTC Login Automation</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="IRCTC Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        /><br />
        <input
          type="password"
          placeholder="IRCTC Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br />
        <button type="submit">Start Automation</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default App;
