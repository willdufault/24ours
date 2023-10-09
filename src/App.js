import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Dropzone from 'react-dropzone'


function App() {
  const [URL, setURL] = useState('File URL');
  const [file, setFile] = useState(null);
  const [dropText, setDropText] = useState('Choose A File Or Drag It Here');

  const getFile = (acceptedFiles) => {
    const inFile = acceptedFiles[0];
    // console.log(file.size);
    if (inFile.size > 5300000) {
      setDropText('File is too big! The limit is 5MB');
    } else {
      setFile(inFile);
      setDropText(inFile.name);
    }
  };

  const uploadFile = () => {
    console.log(file)
  }

  return (
    <div className="container mt-4">
      <div className="App">
        <div className="Container">
          <div className="Top-Form">
            <span className="form-control" id="URL-Field">{URL}</span>
            <button className="btn btn-primary" onClick={(e) => uploadFile()}>Submit</button>
          </div>
          <div className="File-Input">
            <Dropzone onDrop={getFile}>
              {({getRootProps, getInputProps}) => (
                <section className="Upload-Area">
                  <div className="Drop-Area" {...getRootProps()}>
                    <input {...getInputProps()} />
                    <span className="Drop-Text" >{dropText}</span>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;