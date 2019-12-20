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
//app.get('/', function(req, res) {
//	console.log('GET the homepage');
//	res
//		.status(200)
//		.sendFile(path.join(__dirname, 'public', 'index.html'));
//});


app.use(bodyParser.urlencoded({
	extended: false //only need strings and arrays
}));

app.use('/api', routes);

const server = app.listen(app.get('port'), function() {
	const port = server.address().port;
	console.log('Listening port ' + port);
});
