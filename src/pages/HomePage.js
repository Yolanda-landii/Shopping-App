import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLists, addList, updateList, deleteList, addItem, updateItem, deleteItem } from '../redux/reduxSlices/shoppingListSlice';
import { 
  fetchShoppingLists, 
  addShoppingList, 
  updateShoppingList, 
  deleteShoppingList, 
  addItemToList, 
  updateItemInList, 
  deleteItemFromList 
} from '../utils/localStorage'; // Import your localStorage functions
import AddItem from '../components/ShoppingList/AddItem';
import EditItemForm from '../components/ShoppingList/EditItem';

const HomePage = () => {
  const [newListName, setNewListName] = useState('');
  const [category, setCategory] = useState('');
  const [notes, setNotes] = useState('');
  const [editingList, setEditingList] = useState(null);
  const [editListName, setEditListName] = useState('');
  const [editCategory, setEditCategory] = useState('');
  const [editNotes, setEditNotes] = useState('');

  const lists = useSelector(state => state.shoppingList.lists);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadedLists = fetchShoppingLists();
    dispatch(setLists(loadedLists));
  }, [dispatch]);

  const handleAddList = (e) => {
    e.preventDefault();
    if (!newListName.trim()) return;

    const newList = {
      id: Date.now(),
      name: newListName,
      category,
      notes,
      items: [],
    };

    addShoppingList(newList);
    dispatch(addList(newList));
    setNewListName('');
    setCategory('');
    setNotes('');
  };

  const handleEditList = (listId) => {
    const updatedList = {
      name: editListName,
      category: editCategory,
      notes: editNotes,
    };

    updateShoppingList(listId, updatedList);
    dispatch(updateList({ id: listId, updatedList }));
    setEditingList(null);
  };

  const handleDeleteList = (listId) => {
    deleteShoppingList(listId);
    dispatch(deleteList(listId));
  };

  const handleAddItem = (listId, item) => {
    addItemToList(listId, item);
    dispatch(addItem({ listId, item }));
  };

  const handleEditItem = (listId, itemId, updatedItem) => {
    updateItemInList(listId, itemId, updatedItem);
    dispatch(updateItem({ listId, itemId, updatedItem }));
  };

  const handleDeleteItem = (listId, itemId) => {
    deleteItemFromList(listId, itemId);
    dispatch(deleteItem({ listId, itemId }));
  };

  return (
    <div className="home-page">
      <h1>Shopping Lists</h1>
      <form onSubmit={handleAddList}>
        <input
          type="text"
          value={newListName}
          onChange={(e) => setNewListName(e.target.value)}
          placeholder="New List Name"
          required
        />
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category"
        />
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Optional Notes"
        />
        <button type="submit">Add List</button>
      </form>
      <div className="lists-container">
        {lists.map(list => (
          <div key={list.id} className="shopping-list">
            {editingList === list.id ? (
              <div>
                <input
                  type="text"
                  value={editListName}
                  onChange={(e) => setEditListName(e.target.value)}
                  placeholder="Edit List Name"
                />
                <input
                  type="text"
                  value={editCategory}
                  onChange={(e) => setEditCategory(e.target.value)}
                  placeholder="Edit Category"
                />
                <textarea
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  placeholder="Edit Notes"
                />
                <button onClick={() => handleEditList(list.id)}>Save Changes</button>
                <button onClick={() => setEditingList(null)}>Cancel</button>
              </div>
            ) : (
              <div>
                <h2>{list.name}</h2>
                <p>Category: {list.category}</p>
                <p>Notes: {list.notes}</p>
                <button onClick={() => { setEditingList(list.id); setEditListName(list.name); setEditCategory(list.category); setEditNotes(list.notes); }}>Edit List</button>
                <button onClick={() => handleDeleteList(list.id)}>Delete List</button>
                <ul>
                  {list.items.map(item => (
                    <li key={item.id}>
                      {item.name} - {item.quantity} - {item.notes}
                      {item.imageUrl && <img src={item.imageUrl} alt={item.name} style={{ width: '50px', height: '50px' }} />}
                      <button onClick={() => handleDeleteItem(list.id, item.id)}>Delete</button>
                      <EditItemForm listId={list.id} item={item} onEditItem={handleEditItem} />
                    </li>
                  ))}
                </ul>
                <AddItem listId={list.id} onAddItem={handleAddItem} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
