import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [URL, setURL] = useState('File URL');

  function getFile(e){
    const fileInput = e.target;
    setURL(fileInput.files[0].name);
  }

  return (
    <div className="container mt-4">
      <div className="App">
        <span className="form-control" id="URL-Field">{URL}</span>
        <div className="File-Input">
          <input className='Upload-Button' id='File' title='Upload File' type='file' onChange={getFile}/>
          <span className="Upload-Text">Upload or Drag File</span>
        </div>
      </div>
    </div>
  );
}

export default App;