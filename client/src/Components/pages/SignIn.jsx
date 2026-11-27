import React, { useState } from 'react';
import '../styles/SignIn.css';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');   // feedback text
  const [messageType, setMessageType] = useState(''); // 'success' | 'error'
  const [loading, setLoading] = useState(false);

  const handle_submit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setMessageType('success');
        setMessage(data.message || 'Sign-in successful. Welcome!');
      } else {
        setMessageType('error');
        setMessage(data.message || 'Invalid email or password. Try Again.');
      }

    } catch (error) {
      setMessageType('error');
      setMessage('Unable to connect to the server. Please try again later.');

    } finally {
      setLoading(false);
    }
  };






  return (
    <section className="sign-in">
      <h3>Sign In to your Account</h3>

      {message && (
        <div className={`feedback ${messageType}`} role="alert">
          {message}
        </div>
      )}

      <form className="signIn-form" onSubmit={handle_submit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            className="form-control"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            className="form-control"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="form-control" disabled={loading}>
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
    </section>
  )
}

export default SignIn;
