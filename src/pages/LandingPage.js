
import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Shared/Footer'; 

const LandingPage = () => {
  return (
    <div className="landing-page-container">
      <header className="navbar">
        <div className="logo">Shopping List</div>
        <nav>
          <Link to="/login" className="nav-link auth-link">Login</Link>
          <Link to="/register" className="nav-link auth-link">Sign Up</Link>
        </nav>
      </header>
      <div className="cta-section">
        <Link to="/register" className="cta-button">Get Started</Link>
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;
