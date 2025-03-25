import React, { useState } from 'react';
import './ShoppingList.css';

const EditItemModal = ({ item, onSave, onCancel }) => {
  const [name, setName] = useState(item.name);
  const [quantity, setQuantity] = useState(item.quantity);
  const [notes, setNotes] = useState(item.notes || '');
  const [image, setImage] = useState(item.image);
  const [previewUrl, setPreviewUrl] = useState(item.image);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5000000) { // 5MB limit
        alert('Image size should be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setPreviewUrl(URL.createObjectURL(file));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    onSave({
      ...item,
      name: name.trim(),
      quantity: quantity.trim(),
      notes: notes.trim(),
      image: image,
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <form onSubmit={handleSubmit} className="edit-item-form">
          <h2>Edit Item</h2>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
              id="edit-item-image"
            />
            <label htmlFor="edit-item-image" className="file-input-label">
              Change Image
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
          <div className="modal-buttons">
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
      </div>
    </div>
  );
};

export default EditItemModal; 