// pages/SignUp.js
import React from 'react';
import SignUpForm from '../components/signupForm';
import '../styles/signup.css'

const SignUp = () => {
  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <SignUpForm />
    </div>
  );
};

export default SignUp;
