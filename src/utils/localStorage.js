

const getData = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

const setData = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const addUser = (user) => {
  const users = getData('users');
  users.push(user);
  setData('users', users);
};

export const fetchUsers = () => {
  return getData('users');
};

export const updateUser = (id, updatedUser) => {
  const users = getData('users');
  const index = users.findIndex(user => user.id === id);
  if (index !== -1) {
    users[index] = { ...users[index], ...updatedUser };
    setData('users', users);
  }
};

export const fetchShoppingLists = () => {
  return getData('shoppingLists');
};

export const addShoppingList = (shoppingList) => {
  const lists = getData('shoppingLists');
  lists.push(shoppingList);
  setData('shoppingLists', lists);
};

export const updateShoppingList = (id, updatedList) => {
  const lists = getData('shoppingLists');
  const index = lists.findIndex(list => list.id === id);
  if (index !== -1) {
    lists[index] = { ...lists[index], ...updatedList };
    setData('shoppingLists', lists);
  }
};

export const deleteShoppingList = (id) => {
  const lists = getData('shoppingLists');
  const updatedLists = lists.filter(list => list.id !== id);
  setData('shoppingLists', updatedLists);
};

export const addItemToList = (listId, item) => {
  const lists = getData('shoppingLists');
  const list = lists.find(list => list.id === listId);
  if (list) {
    list.items.push(item);
    setData('shoppingLists', lists);
  }
};

export const updateItemInList = (listId, itemId, updatedItem) => {
  const lists = getData('shoppingLists');
  const list = lists.find(list => list.id === listId);
  if (list) {
    const itemIndex = list.items.findIndex(item => item.id === itemId);
    if (itemIndex !== -1) {
      list.items[itemIndex] = { ...list.items[itemIndex], ...updatedItem };
      setData('shoppingLists', lists);
    }
  }
};

export const deleteItemFromList = (listId, itemId) => {
  const lists = getData('shoppingLists');
  const list = lists.find(list => list.id === listId);
  if (list) {
    list.items = list.items.filter(item => item.id !== itemId);
    setData('shoppingLists', lists);
  }
};
