const express = require('express');
const path = require('path');

const app = express();

// set constant in express
app.set('port', 3000);

// set static resources path
// define subset of routs with first argument `/public`
app.use(express.static(path.join(__dirname, 'public')));

//app.get('/', function(req, res) {
//	console.log('GET the homepage');
//	res
//		.status(200)
//		.sendFile(path.join(__dirname, 'public', 'index.html'));
//});

app.get('/json', function(req, res) {
	console.log('GET the json');
	res
		.status(200)
		.json( {"jsonData" : true} );
});

app.get('/file', function(req, res) {
	console.log('GET the file');
	res
		.status(200)
		.sendFile(path.join(__dirname, 'app.js') );
});

const server = app.listen(app.get('port'), function() {
	const port = server.address().port;
	console.log('Listening port ' + port);
});
