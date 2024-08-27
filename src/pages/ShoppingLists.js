// src/pages/ShoppingListPage.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ShoppingListPage = () => {
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

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/shoppingLists/${id}`);
      loadItems(); // Reload items after deletion
    } catch (error) {
      console.error('Failed to delete item', error);
    }
  };

  return (
    <div className="shopping-list-page">
      <h1>Your Shopping Lists</h1>
      {items.length > 0 ? (
        items.map((item) => (
          <div key={item.id} className="shopping-list-item">
            <h3>{item.name}</h3>
            <p>Quantity: {item.quantity}</p>
            <p>Category: {item.category}</p>
            <p>Notes: {item.notes}</p>
            {item.image && <img src={item.image} alt={item.name} />}
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </div>
        ))
      ) : (
        <p>No items added yet.</p>
      )}
    </div>
  );
};

export default ShoppingListPage;
