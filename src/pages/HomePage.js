import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AddItem from '../components/ShoppingList/AddItem';
import axios from 'axios';

const HomePage = () => {
  const [items, setItems] = useState([]);

  const loadItems = async () => {
    try {
      const response = await axios.get('http://localhost:5000/shoppingLists');
      setItems(response.data);
    } catch (error) {
      console.error('Failed to load items', error);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  return (
    <div className="home-page">
      <h1>Welcome to Your Shopping List App</h1>
      <p>Manage your shopping lists easily and efficiently.</p>

      <div className="navigation-buttons">
        {/* <Link to="/profile">
          <button className="btn">Go to Profile</button>
        </Link> */}
       <Link to="/shopping-list">
        <button className="btn">View Shopping List</button>
       </Link>

        <AddItem loadItems={loadItems} />
      </div>
    </div>
  );
};

export default HomePage;
