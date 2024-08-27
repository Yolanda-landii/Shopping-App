import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ShoppingListCard from './ShoppingListCard';

function ShoppingListOverview() {
  const [searchTerm, setSearchTerm] = useState('');
  const shoppingLists = useSelector((state) => state.shoppingLists.items);

  const filteredLists = shoppingLists.filter((list) =>
    list.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="shopping-list-overview">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search Lists..."
      />
      <div className="shopping-list-cards">
        {filteredLists.map((list) => (
          <ShoppingListCard key={list.id} list={list} />
        ))}
      </div>
    </div>
  );
}

export default ShoppingListOverview;
