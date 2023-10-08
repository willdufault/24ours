import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FileUploader } from "react-drag-drop-files";
import Dropzone from 'react-dropzone'


function App() {
  const [URL, setURL] = useState('File URL');
  const [file, setFile] = useState(null);
  const [dropText, setDropText] = useState('Choose A File Or Drag It Here');

  const fileTypes = ["JPG", "PNG", "GIF"];

  const getFile = (file) => {
    console.log(file[0]);
    setFile(file[0]);
    setDropText(file[0].name);
  };

  return (
    <div className="container mt-4">
      <div className="App">
        <div className="Container">
          <span className="form-control" id="URL-Field">{URL}</span>
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