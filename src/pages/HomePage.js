import React from 'react';
import { Link } from 'react-router-dom';
import AddItem from '../components/ShoppingList/AddItem';

const HomePage = () => {
    
  return (
    <div className="home-page">
      <h1>Welcome to Your Shopping List App</h1>
      <p>Manage your shopping lists easily and efficiently.</p>
      
      <div className="navigation-buttons">
        <Link to="/profile">
          <button className="btn">Go to Profile</button>
        </Link>
        <Link to="/shopping-list">
          <button className="btn">View Shopping List</button>
        </Link>
        
        < AddItem/>
        
      </div>
    </div>
  );
};

export default HomePage;
