// src/components/Shared/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Shared.css'; 

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">
          <i className="fa fa-shopping-cart"></i> Online <span>Store</span>
        </div>
        <div className="nav-links">
          <Link className="navbar-link" to="/home">Home</Link>
          <Link className="navbar-link" to="/products">Products</Link>
          <Link className="navbar-link" to="/about">About</Link>
          <Link className="navbar-link" to="/contact">Contact</Link>
        </div>
        <div className="contact-info">
          <p>Call Now</p>
          <span>1800 888 555</span>
        </div>
        <button className="navbar-button" onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
