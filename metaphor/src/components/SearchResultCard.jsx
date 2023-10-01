import React from 'react';
import './SearchResultCard.css';

function SearchResultCard({ result, onToggle, selected }) {
    return (
        <div 
            className={`search-result-card ${selected ? "selected" : ""}`}
        >
            <div className="card-content" onClick={() => onToggle(result.id)}>
                <h3>{result.title}</h3>
                <a href={result.url} target="_blank" rel="noopener noreferrer">{result.url}</a>
            </div>
            <div className="checkbox-container">
                <input 
                    type="checkbox" 
                    checked={selected}
                    onChange={() => onToggle(result.id)} 
                />
                <label>Include</label>
            </div>
        </div>
    );
}


export default SearchResultCard;
