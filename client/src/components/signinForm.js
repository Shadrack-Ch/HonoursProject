// components/SignInForm.js
import React, { useState } from 'react';

const SignInForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      // Send sign-in request to the backend API
      const response = await fetch('/api/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // User sign-in was successful
        // Redirect to the home page or perform any necessary actions
        console.log('Sign-in successful!');
      } else {
        // User sign-in failed
        // Display an error message to the user
        console.log('Sign-in failed!');
      }
    } catch (error) {
      console.error('Error during sign-in:', error);
    }
  };

  return (
    <form onSubmit={handleSignIn}>
      {/* Input fields for email and password */}
      {/* ... */}
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
      <button type="submit">Sign In</button>
    </form>
  );
};

export default SignInForm;
