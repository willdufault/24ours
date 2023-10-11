import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Dropzone from 'react-dropzone'
import logo from './24ours.png';

function App() {
  const [URL, setURL] = useState('');
  const [file, setFile] = useState(null);
  const [dropText, setDropText] = useState('Choose A File Or Drag It Here');
  const [uploadMessage, setUploadMessage] = useState(null);

  const getFile = (acceptedFiles) => {
    setURL('');
    const inFile = acceptedFiles[0];
    // console.log(inFile);
    if (inFile.size > 5300000) {
      setDropText('File is too big! The limit is 5MB');
    } else {
      setFile(inFile);
      setDropText(inFile.name);
    }
  };

  const convertFileToBase64 = (file) => new Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

  const uploadFile = async () => {

	  let file_body = (await convertFileToBase64(file)).split(',')[1];

    const requestData = {
      fileName: file.name,
      fileBody: file_body
    }

	  console.log(requestData)
   
    const response = await axios.post('/uploadfile', requestData);
    let data = response.data;
      if(data.statusCode === 200) {
        setURL(data.body.url);
        setUploadMessage('File succesfully uploaded! Copy the link and share!');
      } else {
        setUploadMessage('Error uploading file');
      }
    
  }

  const copyLink = () => {
    if(URL !== '') {
      navigator.clipboard.writeText(URL)
      .then(() => {
        setUploadMessage('URL copied to clipboard!');
      })
    } else {
      setUploadMessage('Please upload a file');
    }
  };

  return (
    <div>
      <div className="Top-Logo">
        <img src={logo} alt="Logo" width="250" height="125" />
      </div>
      <div className="container mt-4">
        <div className="App">
          <div className="Container">
            <div className="Top-Form">
              {/* <span className="form-control" id="URL-Field">{URL}</span> */}
              <button className="btn btn-success mx-4" onClick={copyLink}>Copy Link</button>
              <button className="btn btn-primary mx-4" onClick={uploadFile}>Submit</button>
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