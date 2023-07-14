// pages/SignIn.js
import React from 'react';
import SignInForm from '../components/signinForm';
import NavBar from '../components/Navbar'

const SignIn = () => {
  return (
    
    <div>
      <NavBar />
      <h2>Sign In</h2>
      <SignInForm />
    </div>
  );
};

export default SignIn;
