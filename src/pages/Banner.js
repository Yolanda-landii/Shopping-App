// src/components/Banner.js
import React from 'react';
import './Pages.css';
import bannerImage from '../assets/pexels-lum3n-44775-322207.jpg'; // Add your image in the 'assets' folder

const Banner = () => {
  return (
    <section className="banner">
      <div className="banner-content">
        <h2>NEW ARRIVALS</h2>
        <h1>JUST FOR YOU</h1>
        <p>FOR ONLINE ORDER</p>
        <button className="btn">30% OFF</button>
      </div>
      <div className="banner-image">
        <img src={bannerImage} alt="Shopping Woman" />
      </div>
    </section>
  );
};

export default Banner;
