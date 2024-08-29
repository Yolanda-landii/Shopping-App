import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLists, addList, updateList, deleteList, updateItem, deleteItem } from '../redux/reduxSlices/shoppingListSlice';
import { 
  fetchShoppingLists, 
  addShoppingList, 
  updateShoppingList, 
  deleteShoppingList, 

  updateItemInList, 
  deleteItemFromList 
} from '../utils/localStorage';
import AddItem from '../components/ShoppingList/AddItem';
import EditItemForm from '../components/ShoppingList/EditItem';
import './Pages.css';  

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


  const handleEditItem = (listId, itemId, updatedItem) => {
    updateItemInList(listId, itemId, updatedItem);
    dispatch(updateItem({ listId, itemId, updatedItem }));
  };

  const handleDeleteItem = (listId, itemId) => {
    deleteItemFromList(listId, itemId);
    dispatch(deleteItem({ listId, itemId }));
  };

  // Define loadItems to reload the list of items
  const loadItems = () => {
    const updatedLists = fetchShoppingLists();
    dispatch(setLists(updatedLists));
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
                <div className="items-container">
                  {list.items.map(item => (
                    <div key={item.id} className="item-card">
                      <h3>{item.name}</h3>
                      <p>Quantity: {item.quantity}</p>
                      <p>Notes: {item.notes}</p>
                      {item.imageUrl && <img src={item.imageUrl} alt={item.name} />}
                      <div className="buttons">
                        <EditItemForm listId={list.id} item={item} onEditItem={handleEditItem} />
                        <button onClick={() => handleDeleteItem(list.id, item.id)}>Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
                <AddItem listId={list.id} loadItems={loadItems} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
