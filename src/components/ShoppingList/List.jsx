import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function List() {
  const [items, setItems] = useState([]);

  const loadItems = async () => {
    try {
      const response = await axios.get('http://localhost:5000/shoppingLists');
      setItems(response.data);
    } catch (error) {
      console.error(error);
      alert('Failed to load items');
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/shoppingLists/${id}`);
      loadItems();
    } catch (error) {
      console.error(error);
      alert('Failed to delete item');
    }
  };

  return (
    <div>
      {items.map((item) => (
        <div key={item.id}>
          <h2>{item.name}</h2>
          <p>Quantity: {item.quantity}</p>
          <p>Notes: {item.notes}</p>
          <p>Category: {item.category}</p>
          <img src={item.image} alt={item.name} />
          <button onClick={() => handleDelete(item.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};


