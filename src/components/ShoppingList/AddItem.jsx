import React, { useState } from 'react';
import { addItemToList } from '../../utils/localStorage';


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

  const handleAddItem = (e) => {
    e.preventDefault();

    if (!item.name || !item.quantity || !item.category) {
      alert('Please fill in all required fields.');
      return;
    }

    const newItem = {
      id: Date.now(),
      ...item,
      imageUrl: item.image ? URL.createObjectURL(item.image) : null 
    };

    addItemToList(listId, newItem);
    loadItems();  
    setItem({
      name: '',
      quantity: '',
      notes: '',
      category: '',
      image: null,
    }); 
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
