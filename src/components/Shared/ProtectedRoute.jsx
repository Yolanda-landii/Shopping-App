import React from 'react';
import { Navigate } from 'react-router-dom';
import Footer from './Footer';

const ProtectedRoute = ({ element }) => {
  const user = JSON.parse(localStorage.getItem('user'));

  return user ? (
    <div className="protected-route-container">
      <div className="protected-route-content">
        {element}
      </div>
      <Footer />
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoute;
