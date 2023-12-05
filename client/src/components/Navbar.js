import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import logo from '../images/Profile_avatar_placeholder_large.png'

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleNotifications = () => {
    setNotifOpen(!notifOpen);
  };

  const toggleUserMenu = () => {
    setUserOpen(!userOpen);
  };

  return (
    <nav className="navbar">
      <div className="logo" onClick={toggleUserMenu}>
        <img src={logo} alt="User Icon" />
        {userOpen && (
          <div className="dropdown-menu">
            <Link to="/signin">Sign In</Link>
            <Link to="/signup">Sign Out</Link>
          </div>
        )}
      </div>
      <div className="notification-icon" onClick={toggleNotifications}>
        <img src={logo} alt="Notifications Icon" />
        {notifOpen && (
          <div className="dropdown-menu">
            <p>This is your first notification</p>
          </div>
        )}
      </div>
      {/* ... Rest of your code ... */}
    </nav>
  );
}

export default NavBar;
