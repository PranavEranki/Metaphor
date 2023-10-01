import React, { useState } from 'react';
import PromptingTips from './components/PromptingTips';
import SearchBar from './components/SearchBar';
import SearchResultCard from './components/SearchResultCard';

import './App.css';

function App() {

  const [searchResults, setSearchResults] = useState([]); 
  const [selectedResults, setSelectedResults] = useState(new Set());
  const [searchInitiated, setSearchInitiated] = useState(false);
  const [exportSelected, setExportSelected] = useState([]);
  const [showSelected, setShowSelected] = useState(false); // To control which view to show


    const handleResultToggle = (id) => {
        const newSelected = new Set(selectedResults);
        if (newSelected.has(id)) {
            newSelected.delete(id);
        } else {
            newSelected.add(id);
        }
        setSelectedResults(newSelected);
    };

    const handleReprompt = () => {
      // Collecting selected result URLs
      if (selectedResults.size === 0) {
        alert("Please select at least one result to reprompt or search a new query if unsatisfied with the results.");
        return;
      }

      const selectedUrls = searchResults.filter(result => selectedResults.has(result.id)).map(result => result.url);
      
      // Send them to our Flask backend
      fetch('http://127.0.0.1:5000/reprompt', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ selected_urls: selectedUrls }),
      })
      .then(response => response.json())
      .then(data => {
        const currentIds = new Set(searchResults.map(result => result.id));
        const uniqueNewResults = data.results.filter(newResult => !currentIds.has(newResult.id));
        setSearchResults([...uniqueNewResults]);
        setSelectedResults(new Set()); // unselect
      })
      .catch(error => {
          console.error('Error during reprompt:', error);
      });
  };
  

  const handleContinue = () => {
    if (selectedResults.size === 0) {
      alert("Please select at least one result to continue or search a new query if unsatisfied with the results.");
      return;
    }
    setExportSelected(new Set());
    setShowSelected(true);
  };

  const handleRestart = () => {
    setShowSelected(false);
    setSearchResults([]);
    setSelectedResults(new Set());
    setSearchInitiated(false);
  };

  const handleExportSome = () => {
    // Convert selected results into CSV format
    const selected = searchResults.filter(result => exportSelected.has(result.id));
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Title,URL,Author,Published Date\n";
    selected.forEach(result => {
        csvContent += `"${result.title}","${result.url}","${result.author || 'N/A'}","${result.publishedDate || 'N/A'}"\n`;
    });

    // Trigger download
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "selected_results.csv");
    document.body.appendChild(link);
    link.click();
  }

  const handleExportAll = () => {
      // Convert selected results into CSV format
      const selected = searchResults.filter(result => selectedResults.has(result.id));
      let csvContent = "data:text/csv;charset=utf-8,";
      csvContent += "Title,URL,Author,Published Date\n";
      selected.forEach(result => {
          csvContent += `"${result.title}","${result.url}","${result.author || 'N/A'}","${result.publishedDate || 'N/A'}"\n`;
      });
  
      // Trigger download
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "selected_results.csv");
      document.body.appendChild(link);
      link.click();
  };

    const toggleForExport = (id) => {
      const newSelected = new Set(exportSelected);
      if (newSelected.has(id)) {
          newSelected.delete(id);
      } else {
          newSelected.add(id);
      }
      setExportSelected(newSelected);
    }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Niche Community / News Finder</h1>
      </header>
      
      <main>
        {showSelected ? (
          <div>
            {Array.from(selectedResults).map(id => {
              const result = searchResults.find(r => r.id === id);
              return <SearchResultCard key={id} result={result} onToggle={toggleForExport}/>;
            })}
            <button onClick={handleRestart}>Start Again</button>
            <button onClick={handleExportSome}>Export selected to CSV</button>
            <button onClick={handleExportAll}>Export ALL to CSV</button>
          </div>
        ) : (
          <div>
            <PromptingTips/>
            <SearchBar 
                    onSearch={(results) => {
                        setSearchResults(results.results); // Assuming `results` is an array.
                        setSelectedResults(new Set());
                        setSearchInitiated(true);
                    }}
                />
                {searchInitiated && searchResults.length>0 && (
                    <p>
                        Below you'll see the results we found based on your query. You can click on each result to understand its relevance to your search. 
                        If a particular result interests you, please select it using the checkbox provided. Once you've gone through all the results, 
                        you have two options:
                        <br /><br />
                        1. <strong>Reprompt:</strong> If you think there's more to explore or you want results similar to the ones you've selected, select a few links that interest you and click "Reprompt". This will fetch additional relevant links.
                        <br />
                        2. <strong>Continue:</strong> If you're satisfied with your selections, click "Continue" to move forward and view more details of your chosen links.
                    </p>
                  )}
                  <div className="results-container">
                      {searchResults.map(result => (
                          <SearchResultCard 
                              key={result.id} 
                              result={result} 
                              onToggle={handleResultToggle}
                              selected={selectedResults.has(result.id)}
                          />
                      ))}
                  </div>
                {searchInitiated && searchResults.length > 0 && (
                    <>
                        
                        <button onClick={handleReprompt}>Reprompt</button>
                        <button onClick={handleContinue}>Continue</button>
                    </>
                )}
            </div>
          )}
      </main>

      <footer>
        <br/>
        {'Built by Pranav Eranki - 2023 - 3 hour demo project for Metaphor!'}
        <br/>
        <br/>
      </footer>
    </div>
  );
}

export default App;
