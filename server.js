// Configure Express.js.
let express = require('express');
let app = express();
let port = 3000;
app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});

// Configure axios.
let axios = require('axios');
let instance = axios.create({
	// TODO: NEED A WAY TO HIDE THIS IN GITHUB.
	baseURL: 'https://y913nvzd14.execute-api.us-east-1.amazonaws.com/dev'
});

// GET and POST requests.
app.get('/', (request, result) => {
	instance.post('/uploadfile', {
		'fileName': 'testing.txt',
		'fileBody': 'wowziers this is working'
	})
	.then(response => {
		result.send(response.data);
	})
	.catch((error) => {
		result.send({'message': error});
	});
});

app.post('/uploadfile', async (request, result) => {
	instance.post('/uploadfile', {
		'fileName': 'hi_from_express.jpg',
		'fileBody': new FileReader().readAsText('./buff-bee.jpg')
	})
	.then(response => {
		result.status(200).json(response.data);
	})
	.catch((error) => {
		result.status(400).json({'message': error});
	});
});