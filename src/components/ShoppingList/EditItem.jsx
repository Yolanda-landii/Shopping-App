import React, { useState, useEffect } from 'react';


const EditItemForm = ({ listId, item, onEditItem }) => {
  const [itemName, setItemName] = useState(item.name);
  const [quantity, setQuantity] = useState(item.quantity);
  const [notes, setNotes] = useState(item.notes);
  const [imageUrl, setImageUrl] = useState(item.imageUrl);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedItem = {
      name: itemName,
      quantity,
      notes,
      imageUrl,
    };
    onEditItem(listId, item.id, updatedItem);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
        placeholder="Item Name"
        required
      />
      <input
        type="text"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        placeholder="Quantity"
        required
      />
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Optional Notes"
      />
      <input
        type="text"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        placeholder="Image URL"
      />
      <button type="submit">Save Changes</button>
    </form>
  );
};

export default EditItemForm;