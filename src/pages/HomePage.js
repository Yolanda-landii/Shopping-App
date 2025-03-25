import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { setLists, addList, updateList, deleteList } from '../redux/reduxSlices/shoppingListSlice';
import { fetchShoppingLists, addShoppingList, updateShoppingList, deleteShoppingList } from '../utils/localStorage';
import AddItem from '../components/ShoppingList/AddItem';
import EditItemForm from '../components/ShoppingList/EditItem';
import './Pages.css';

const HomePage = () => {
  const [newListName, setNewListName] = useState('');
  const [category, setCategory] = useState('');
  const [notes, setNotes] = useState('');
  const [editingList, setEditingList] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const lists = useSelector(state => state.shoppingList.lists);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const query = searchParams.get('search');

  useEffect(() => {
    dispatch(setLists(fetchShoppingLists()));
  }, [dispatch]);

  useEffect(() => {
    setSearchQuery(query || '');
  }, [query]);

  const handleAddList = (e) => {
    e.preventDefault();
    if (!newListName.trim()) return;

    const newList = {
      id: Date.now(),
      name: newListName,
      category,
      notes,
      items: [],
      createdAt: new Date().toISOString(),
    };

    addShoppingList(newList);
    dispatch(addList(newList));
    setNewListName('');
    setCategory('');
    setNotes('');
    setShowAddForm(false);
  };

  const handleEditList = (listId, updatedList) => {
    updateShoppingList(listId, updatedList);
    dispatch(updateList({ id: listId, updatedList }));
    setEditingList(null);
  };

  const handleDeleteList = (listId) => {
    if (window.confirm('Are you sure you want to delete this list?')) {
      deleteShoppingList(listId);
      dispatch(deleteList(listId));
    }
  };

  const handleDeleteItem = (listId, itemId) => {
    const updatedList = lists.find(list => list.id === listId);
    if (updatedList) {
      const newList = {
        ...updatedList,
        items: updatedList.items.filter(item => item.id !== itemId)
      };
      handleEditList(listId, newList);
    }
  };

  const handleSortChange = (sortBy) => {
    navigate(`?sort=${sortBy}&search=${searchQuery}`);
  };

  const handleSearchChange = (e) => {
    const searchValue = e.target.value;
    setSearchQuery(searchValue);
    navigate(`?sort=${sort}&search=${searchValue}`);
  };

  const getSortedLists = () => {
    let sortedLists = [...lists];
    switch (sort) {
      case 'name':
        sortedLists.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'category':
        sortedLists.sort((a, b) => a.category.localeCompare(b.category));
        break;
      case 'date':
        sortedLists.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      default:
        break;
    }
    return sortedLists;
  };

  const filteredLists = getSortedLists().filter(list => 
    list.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    list.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    list.items.some(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="home-page">
      <div className="controls-section">
        <div className="search-sort-container">
          <select 
            onChange={(e) => handleSortChange(e.target.value)} 
            value={sort || ''}
            className="sort-select"
          >
            <option value="">Sort by...</option>
            <option value="name">Name</option>
            <option value="category">Category</option>
            <option value="date">Date added</option>
          </select>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search lists and items..."
            className="search-input"
          />
        </div>
        <button 
          className="add-list-btn"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? 'Cancel' : 'Add New List'}
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleAddList} className="add-list-form">
          <input
            type="text"
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
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
            placeholder="Optional Notes"
            className="form-textarea"
          />
          <button type="submit" className="submit-btn">Create List</button>
        </form>
      )}

      <div className="lists-container">
        {filteredLists.length === 0 ? (
          <div className="no-lists">
            <p>No shopping lists found. Create your first list!</p>
          </div>
        ) : (
          filteredLists.map(list => (
            <div key={list.id} className="shopping-list-card">
              {editingList === list.id ? (
                <EditItemForm 
                  list={list} 
                  onSave={(updatedList) => handleEditList(list.id, updatedList)} 
                  onCancel={() => setEditingList(null)} 
                />
              ) : (
                <div className="list-content">
                  <div className="list-header">
                    <h2>{list.name}</h2>
                    <div className="list-actions">
                      <button 
                        onClick={() => setEditingList(list.id)}
                        className="edit-btn"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDeleteList(list.id)}
                        className="delete-btn"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <p className="list-category">Category: {list.category}</p>
                  {list.notes && <p className="list-notes">Notes: {list.notes}</p>}
                  <div className="items-container">
                    {list.items.map(item => (
                      <div key={item.id} className="item-card">
                        <div className="item-content">
                          <h3>{item.name}</h3>
                          <p>Quantity: {item.quantity}</p>
                          {item.notes && <p>Notes: {item.notes}</p>}
                          {item.imageUrl && (
                            <img 
                              src={item.imageUrl} 
                              alt={item.name} 
                              className="item-image"
                            />
                          )}
                        </div>
                        <button 
                          onClick={() => handleDeleteItem(list.id, item.id)}
                          className="delete-item-btn"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                  <AddItem listId={list.id} />
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HomePage;
