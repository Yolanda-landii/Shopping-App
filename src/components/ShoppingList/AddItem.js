import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateList } from '../../redux/reduxSlices/shoppingListSlice';
import { updateShoppingList } from '../../utils/localStorage';
import './ShoppingList.css';

const AddItem = ({ listId }) => {
  const [showForm, setShowForm] = useState(false);
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [notes, setNotes] = useState('');
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');

  const dispatch = useDispatch();
  const lists = useSelector(state => state.shoppingList.lists);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5000000) { // 5MB limit
        alert('Image size should be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Store base64 string
        setPreviewUrl(URL.createObjectURL(file)); // Create preview URL
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!itemName.trim()) return;

    const list = lists.find(l => l.id === listId);
    if (!list) return;

    const newItem = {
      id: Date.now(),
      name: itemName.trim(),
      quantity: quantity.trim(),
      notes: notes.trim(),
      image: image, // Store base64 string
    };

    const updatedList = {
      ...list,
      items: [...list.items, newItem]
    };

    updateShoppingList(listId, updatedList);
    dispatch(updateList({ id: listId, updatedList }));

    // Reset form
    setItemName('');
    setQuantity('');
    setNotes('');
    setImage(null);
    setPreviewUrl('');
    setShowForm(false);
  };

  return (
    <div className="add-item-section">
      {!showForm ? (
        <button 
          className="add-item-btn"
          onClick={() => setShowForm(true)}
        >
          + Add Item
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="add-item-form">
          <input
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            placeholder="Item Name"
            required
            className="form-input"
          />
          <input
            type="text"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Quantity"
            className="form-input"
          />
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Notes (optional)"
            className="form-textarea"
          />
          <div className="image-upload-container">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="file-input"
              id={`file-input-${listId}`}
            />
            <label htmlFor={`file-input-${listId}`} className="file-input-label">
              Choose Image
            </label>
            {previewUrl && (
              <div className="image-preview">
                <img src={previewUrl} alt="Preview" />
                <button 
                  type="button" 
                  onClick={() => {
                    setImage(null);
                    setPreviewUrl('');
                  }}
                  className="remove-image-btn"
                >
                  Remove Image
                </button>
              </div>
            )}
          </div>
          <div className="form-buttons">
            <button type="submit" className="submit-btn">
              Add Item
            </button>
            <button 
              type="button" 
              onClick={() => {
                setShowForm(false);
                setImage(null);
                setPreviewUrl('');
              }}
              className="cancel-btn"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddItem; 