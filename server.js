const path = require('path');
const bodyParser = require('body-parser');
let express = require('express');
let app = express();
let port = 3000;
app.use(bodyParser.json({limit: '10mb'}));
// app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));
app.use(express.json());
app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});

// Configure environment variables.
require('dotenv').config()

// Configure axios.
let axios = require('axios');
let instance = axios.create({
	baseURL: process.env.API_ENDPOINT_URL,
});

// GET and POST requests.
// app.get('/', (request, result) => {
// 	result.send('hi from express server!')
// });

app.post('/uploadfile', async (request, result) => {
	instance.post('/uploadfile', {
		'fileName': request.body.fileName,
		'fileBody': request.body.fileBody
	})
	.then(response => {
		result.status(200).json(response.data);
	})
	.catch((error) => {
		result.status(400).json({'message': error});
	});
});

// ***********************
// will: i added the above implementation of '/uploadfile'. i think it should work for what the 
// node.js server needs to do but pls message me on discord if it's missing something
// ***********************
// app.post('/uploadfile', async (request, result) => {
// 	// instance.post('/uploadfile', {
// 	// 	'fileName': request.body.fileName,
// 	// 	'fileBody': new FileReader().readAsText(request.body.fileBody)
// 	// })
// 	// .then(response => {
// 	// 	result.status(200).json(response.data);
// 	// 	response.end(request.json);
// 	// })
// 	// .catch((error) => {
// 	// 	result.status(400).json({'message': error});
// 	// });

// 	const json = request.body;

//   	response.writeHead( 200, { 'Content-Type': 'application/json'})

// 	console.log( request.json )

// 	response.end( request.json )
// });

// TODO: PLEASE ADD COMMENTS TO THIS SECTION
app.use(express.static(path.join(__dirname, '/frontend/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/frontend/build', 'index.html'));
});

// const listener = app.listen( 5000 || 3000 )
