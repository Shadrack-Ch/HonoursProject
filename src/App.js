// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'; // <Route exact path='/' element={<Home/>} />
import SignUp from './pages/signup';
import SignIn from './pages/signin';

const App = () => {
  return (
    <Router>
      <Routes>
        
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/signin' element={<SignIn/>} />
      </Routes>
    </Router>
  );
};

export default App;
