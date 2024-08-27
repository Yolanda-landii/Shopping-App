import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Shared/Footer';
import './Pages.css';
import appImage from '../assets/pexels-brandandpalms-768975.jpg'; // Import the image

const LandingPage = () => {
  return (
    <div className="landing-page-container">
      {/* Navbar Section */}
      <header className="navbar">
        <div className="navbar-container">
        <div className="logo">
          <i className="fa fa-shopping-cart"></i> Shopping <span>List</span>
        </div>
          <nav>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/register" className="nav-link">Sign Up</Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Great App that makes your life easier</h1>
          <p className="hero-subtitle">
            Authoritatively evolve inexpensive services and cross-media core competencies. Compellingly evolve 24/7 testing procedures after compelling schemas.
          </p>
          <Link to="/register" className="cta-button">Get Started</Link>
        </div>
        <div className="hero-image">
          <img src={appImage} alt="App Preview" /> {/* Use the imported image */}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LandingPage;
