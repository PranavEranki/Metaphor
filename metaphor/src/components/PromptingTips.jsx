import React, { useState } from 'react';
import './PromptingTips.css'; // Assuming you'll be using CSS Modules

function PromptingTips() {
  const [showExamples, setShowExamples] = useState(false);

  const toggleExamples = () => {
    setShowExamples(!showExamples);
  };

  return (
    <div className="prompting-tips">
      <h2 className="gradient-text">How to Frame Your Search:</h2>
      <p>
        For optimal search results with Metaphor, consider phrasing your queries in a manner that resembles how someone might refer to a link online.
        <br/>
        Think of how one might introduce a relevant link in a blog post or a forum.
      </p>
      
      <div className="examples-dropdown">
        <button onClick={toggleExamples} className="dropdown-btn">See Examples {showExamples ? '▲' : '▼'}</button>
        {showExamples && (
          <ul>
            <li>
              <strong>Less Effective:</strong> "Motorcycle riding personal page"
              <br />
              <strong>More Effective:</strong> "This person would be great to talk to about motorcycles (personal site here:"
            </li>
            <li>
              <strong>Less Effective:</strong> "What are the best math blogs on the internet?"
              <br />
              <strong>More Effective:</strong> "Besides Terry Tao’s blog, this is my favorite math blog:"
            </li>
            <br/> <br/>
            <li>
              <strong>Tip:</strong> Try to avoid pure keyword searches. Instead of "Jeopardy archive", use phrasings like "Here is the Jeopardy archive:"
            </li>
            <li>
              <strong>Tip:</strong> Transform questions into answers for better results. Rather than "What’s the best way to get started with cooking?", phrase it as "This is the best tutorial on how to get started with cooking:"
            </li>
          </ul>
        )}
      </div>
      
      <p>
        Pay close attention to punctuation at the end of prompts. Using colons (":") can often mimic how someone might introduce a link.
      </p>
    </div>
  );
}

export default PromptingTips;
