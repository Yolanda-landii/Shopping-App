import React, { useState } from 'react';
import axios from 'axios';

export default function AddItem({ loadItems, listId }) {
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

    if (!item.name || !item.quantity || !item.category) {
      alert('Please fill in all required fields.');
      return;
    }

    const formData = new FormData();
    formData.append('name', item.name);
    formData.append('quantity', item.quantity);
    formData.append('notes', item.notes);
    formData.append('category', item.category);
    if (item.image) {
      formData.append('image', item.image);
    }

    try {
      const response = await axios.post(`http://localhost:5000/shoppingLists/${listId}/items`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Item added successfully:', response.data);
      loadItems();  // Reload the updated list after adding the item
    } catch (error) {
      console.error('Failed to add item:', error.response ? error.response.data : error.message);
      alert('Failed to add item');
    }
  };

  return (
    <form onSubmit={handleAddItem}>
      <input
        type="text"
        name="name"
        value={item.name}
        onChange={handleChange}
        placeholder="Item Name"
        required
      />
      <input
        type="text"
        name="quantity"
        value={item.quantity}
        onChange={handleChange}
        placeholder="Quantity"
        required
      />
      <input
        type="text"
        name="notes"
        value={item.notes}
        onChange={handleChange}
        placeholder="Notes"
      />
      <input
        type="text"
        name="category"
        value={item.category}
        onChange={handleChange}
        placeholder="Category"
        required
      />
      <input
        type="file"
        name="image"
        onChange={handleImageChange}
      />
      <button type="submit">Add Item</button>
    </form>
  );
}
