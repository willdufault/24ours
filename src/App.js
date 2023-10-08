import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [URL, setURL] = useState('test.com');

  return (
    <div className="App">
      <div className='Container'>
        <input
                type="text" 
                id="URL-Field"
                onChange={(e) => setURL(e.target.value)}
                value={URL}
              />
      </div>
    </div>
  );
}

export default App;