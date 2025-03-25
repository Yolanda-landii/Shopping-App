import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="not-found">
      <h1>404 - Page Not Found</h1>
      <p>Oops! The page you are looking for does not exist.</p>
      
      <Link to="/home">
        <button className="btn">Go Back to Home</button>
      </Link>
    </div>
  );
};

export default NotFound;
