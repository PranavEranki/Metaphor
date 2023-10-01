import React from 'react';
import './App.css'; // Your App-specific styles.

// Importing components
import PromptingTips from './components/PromptingTips';
import SearchBar from './components/SearchBar';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Niche Community / News Finder</h1>
      </header>
      
      <main>
        <PromptingTips />
        <SearchBar />
      </main>

      <footer>
        {/* Any footer content, like copyright, etc. */}
      </footer>
    </div>
  );
}

export default App;
