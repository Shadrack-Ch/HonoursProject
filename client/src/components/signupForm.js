// components/SignUpForm.js
import React, { useState } from 'react';

const SignUpForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      // Send sign-up request to the backend API
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (response.ok) {
        // User sign-up was successful
        // Redirect to the home page or display a success message
        console.log('Sign-up successful!');
      } else {
        // User sign-up failed
        // Display an error message to the user
        console.log('Sign-up failed!');
      }
    } catch (error) {
      console.error('Error during sign-up:', error);
    }
  };

  return (
    <form onSubmit={handleSignUp} className="signup-form">
      {/* Input fields for username, email, and password */}
      {/* ... */}
      <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        /> <p/>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /> <p/>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /> <p/>
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUpForm;
