import React, { useState } from 'react';

export default function SearchBar ({ handleSearch }){
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchTerm);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input type="text" value={searchTerm} onChange={handleInputChange} placeholder="Search items" />
      <button type="submit">Search</button>
    </form>
  );
};
