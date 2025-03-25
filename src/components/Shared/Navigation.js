import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  return (
    <nav className="main-nav">
      <div className="nav-brand">
        <Link to="/home">ShopList</Link>
      </div>
      <div className="nav-links">
        <Link to="/home">Home</Link>
        <Link to="/shopping-list">Lists</Link>
        <Link to="/profile">Profile</Link>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>
    </nav>
  );
};

export default Navigation; 