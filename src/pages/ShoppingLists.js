import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteList, deleteItem } from '../redux/reduxSlices/shoppingListSlice';
import axios from 'axios';

const ShoppingListPage = () => {
  const lists = useSelector(state => state.shoppingList.lists);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleDeleteList = async (id) => {
    if (window.confirm('Are you sure you want to delete this list?')) {
      setLoading(true);
      try {
        await axios.delete(`http://localhost:5000/shoppingLists/${id}`);
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
        await axios.delete(`http://localhost:5000/shoppingLists/${listId}/items/${itemId}`);
        dispatch(deleteItem({ listId, itemId }));
      } catch (error) {
        console.error('Failed to delete item', error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="shopping-list-page">
      <h1>Your Shopping Lists</h1>
      {loading && <p>Loading...</p>}
      {lists.length > 0 ? (
        lists.map(list => (
          <div key={list.id} className="shopping-list">
            <h2>{list.name}</h2>
            <button onClick={() => handleDeleteList(list.id)} disabled={loading}>
              {loading ? 'Deleting...' : 'Delete List'}
            </button>
            <ul>
              {list.items.map(item => (
                <li key={item.id}>
                  {item.name} - {item.quantity}
                  <button onClick={() => handleDeleteItem(list.id, item.id)} disabled={loading}>
                    {loading ? 'Deleting...' : 'Delete'}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <p>No shopping lists available.</p>
      )}
    </div>
  );
};

export default ShoppingListPage;
