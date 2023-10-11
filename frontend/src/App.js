import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Dropzone from 'react-dropzone'
import logo from './24ours.png';


function App() {
  const [URL, setURL] = useState('File URL');
  const [file, setFile] = useState(null);
  const [dropText, setDropText] = useState('Choose A File Or Drag It Here');
  const [uploadMessage, setUploadMessage] = useState(null);

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

  const uploadFile = async () => {
    const requestData = {
      fileName: file.name,
      fileBody: file
    }
   
    const response = await axios.post('/uploadfile', requestData);
    //console.log(response.body.url);
    if(response.statusCode === 200) {
      setUploadMessage('File succesfully uploaded! Copy the link and share!');
      //un-comment when links are working
      //setURL(response.body.url);
    } else {
      setUploadMessage('Error uploading file');
    }
    
  }

  return (
    <div>
      <div className="Top-Logo">
        <img src={logo} alt="Logo" width="250" height="125" />
      </div>
      <div className="container mt-4">
        <div className="App">
          <div className="Container">
            <div className="Top-Form">
              <span className="form-control" id="URL-Field">{URL}</span>
              <button className="btn btn-primary" onClick={uploadFile}>Submit</button>
            </div>
            <div className="File-Input">
              <Dropzone onDrop={getFile}>
                {({ getRootProps, getInputProps }) => (
                  <section className="Upload-Area">
                    <div className="Drop-Area" {...getRootProps()}>
                      <input {...getInputProps()} />
                      <span className="Drop-Text">{dropText}</span>
                    </div>
                  </section>
                )}
              </Dropzone>
            </div>
            {uploadMessage && <div className="Upload-Message">{uploadMessage}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;