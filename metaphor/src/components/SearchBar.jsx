import React, { useState } from 'react';
import './SearchBar.css';

function SearchBar({ onSearch }) {  // Add the onSearch prop here
  const [query, setQuery] = useState('');

  const metaphorSearch = () => {
    fetch('http://127.0.0.1:5000/search', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    })
    .then(response => response.json())
    .then(data => {
      onSearch(data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
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
