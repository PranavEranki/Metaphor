import React, { useState } from 'react';
import './SearchBar.css';

function SearchBar() {
  const [query, setQuery] = useState('');

  const metaphorSearch = () => {
    // API call to backend or any other logic you want to initiate
  };

  return (
    <div className="search-bar search-parent-container">
      <input 
        type="text" 
        placeholder="Enter your query here..." 
        value={query} 
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={metaphorSearch}>Search using Metaphor!</button>
    </div>
  );
}

export default SearchBar;
