import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function EditItem ({ match, history }) {
  const [item, setItem] = useState({
    name: '',
    quantity: '',
    notes: '',
    category: '',
    image: null,
  });

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/shoppingLists/${match.params.id}`);
        setItem(response.data);
      } catch (error) {
        console.error(error);
        alert('Failed to fetch item');
      }
    };

    fetchItem();
  }, [match.params.id]);

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

  const handleEditItem = async (e) => {
    e.preventDefault();
    const updatedItem = {
      ...item,
      image: item.image ? URL.createObjectURL(item.image) : item.image,
    };

    try {
      await axios.put(`http://localhost:5000/shoppingLists/${match.params.id}`, updatedItem);
      history.push('/');
    } catch (error) {
      console.error(error);
      alert('Failed to update item');
    }
  };

  return (
    <form onSubmit={handleEditItem}>
      <input type="text" name="name" value={item.name} onChange={handleChange} placeholder="Item Name" required />
      <input type="text" name="quantity" value={item.quantity} onChange={handleChange} placeholder="Quantity" required />
      <input type="text" name="notes" value={item.notes} onChange={handleChange} placeholder="Notes" />
      <input type="text" name="category" value={item.category} onChange={handleChange} placeholder="Category" required />
      <input type="file" name="image" onChange={handleImageChange} />
      <button type="submit">Update Item</button>
    </form>
  );
};

