//require('./api/data/dbconnection.js').open();
require('./api/data/db.js');
const express = require('express');
const path = require('path');
const routes = require('./api/routes');
const bodyParser = require('body-parser');

const app = express();

// set constant in express
app.set('port', 3000);

app.use(function(req, res, next) {
	console.log(req.method, req.url);
	next();
});

// set static resources path
// define subset of routs with first argument `/public`
app.use(express.static(path.join(__dirname, 'public')));
app.use('/node_modules', express.static(__dirname + '/node_modules'));

//app.get('/', function(req, res) {
//	console.log('GET the homepage');
//	res
//		.status(200)
//		.sendFile(path.join(__dirname, 'public', 'index.html'));
//});


// enable parsing of posted forms
app.use(bodyParser.urlencoded({
	extended: false //only need strings and arrays
}));
app.use(bodyParser.json());


// add some routing
app.use('/api', routes);

const server = app.listen(app.get('port'), function() {
	const port = server.address().port;
	console.log('Listening port ' + port);
});
