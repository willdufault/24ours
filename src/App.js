import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [URL, setURL] = useState('Placeholder');

  return (
    <div className="container mt-4">
      <div className="App">
        <span className="form-control" id="URL-Field">{URL}</span>
        <div className="File-Input">
          <input className='Upload-Button' title='Upload File' type='file'/>
          <span className="Upload-Text">Upload or Drag Files</span>
        </div>
      </div>
    </div>
  );
}

export default App;