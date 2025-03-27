import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteList, deleteItem } from '../redux/reduxSlices/shoppingListSlice';
import axios from 'axios';
import './ShoppingLists.css';

const ShoppingListPage = () => {
  const lists = useSelector(state => state.shoppingList.lists);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleDeleteList = async (id) => {
    if (window.confirm('Are you sure you want to delete this list?')) {
      setLoading(true);
      try {
        await axios.delete(`https://67e4f72918194932a583e028.mockapi.io/shoppinglistapi/vi/shoppingLists/${id}`);
        dispatch(deleteList(id));
      } catch (error) {
        console.error('Failed to delete list', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDeleteItem = async (listId, itemId) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setLoading(true);
      try {
        await axios.delete(`https://67e4f72918194932a583e028.mockapi.io/shoppinglistapi/vi/shoppingLists/${listId}/items/${itemId}`);
        dispatch(deleteItem({ listId, itemId }));
      } catch (error) {
        console.error('Failed to delete item', error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="shopping-lists-page">
      <div className="page-header">
        <h1>Your Shopping Lists</h1>
        {loading && <div className="loading-spinner">Loading...</div>}
      </div>
      
      <div className="lists-grid">
        {lists.length > 0 ? (
          lists.map(list => (
            <div key={list.id} className="list-card">
              <div className="list-card-header">
                <h2>{list.name}</h2>
                <button 
                  onClick={() => handleDeleteList(list.id)} 
                  disabled={loading}
                  className="delete-list-btn"
                >
                  {loading ? 'Deleting...' : 'Delete List'}
                </button>
              </div>
              
              <div className="items-section">
                {list.items.length > 0 ? (
                  <ul className="items-list">
                    {list.items.map(item => (
                      <li key={item.id} className="item-row">
                        <div className="item-details">
                          <span className="item-name">{item.name}</span>
                          <span className="item-quantity">{item.quantity}</span>
                        </div>
                        <button 
                          onClick={() => handleDeleteItem(list.id, item.id)} 
                          disabled={loading}
                          className="delete-item-btn"
                        >
                          {loading ? '...' : 'Delete'}
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="no-items-message">No items in this list yet.</p>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <p>No shopping lists available.</p>
            <p>Create your first list to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingListPage;
