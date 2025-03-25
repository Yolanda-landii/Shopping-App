import React, { useState } from 'react';
import './ShoppingList.css';

const EditItemForm = ({ list, onSave, onCancel }) => {
  const [name, setName] = useState(list.name);
  const [category, setCategory] = useState(list.category);
  const [notes, setNotes] = useState(list.notes);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    const updatedList = {
      ...list,
      name: name.trim(),
      category: category.trim(),
      notes: notes.trim(),
    };

    onSave(updatedList);
  };

  return (
    <form onSubmit={handleSubmit} className="edit-form">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="List Name"
        required
        className="form-input"
      />
      <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Category"
        className="form-input"
      />
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Notes (optional)"
        className="form-textarea"
      />
      <div className="edit-form-buttons">
        <button type="submit" className="save-btn">
          Save Changes
        </button>
        <button 
          type="button" 
          onClick={onCancel}
          className="cancel-edit-btn"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditItemForm; 