import React, { useState } from 'react';
import axios from 'axios';

export default function AddItem({ loadItems }) {
  const [item, setItem] = useState({
    name: '',
    quantity: '',
    notes: '',
    category: '',
    image: null,
  });

  const handleChange = (e) => {
    setItem({
      ...item,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    setItem({
      ...item,
      image: e.target.files[0]
    });
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    const newItem = {
      ...item,
      image: item.image ? URL.createObjectURL(item.image) : '',
    };

    try {
      await axios.post('http://localhost:5000/shoppingLists', newItem);
      loadItems();  // Ensure this reloads the updated list
    } catch (error) {
      console.error(error);
      alert('Failed to add item');
    }
  };

  return (
    <form onSubmit={handleAddItem}>
      <input type="text" name="name" onChange={handleChange} placeholder="Item Name" required />
      <input type="text" name="quantity" onChange={handleChange} placeholder="Quantity" required />
      <input type="text" name="notes" onChange={handleChange} placeholder="Notes" />
      <input type="text" name="category" onChange={handleChange} placeholder="Category" required />
      <input type="file" name="image" onChange={handleImageChange} />
      <button type="submit">Add Item</button>
    </form>
  );
}
