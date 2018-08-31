'use strict';

//require('colors');

var express = require('express'),
	bodyParser = require('body-parser'),
	api = require('./api'),
	cors = require('cors');

var app = express();

app.set('port', process.env.PORT || 9000);
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

// JSON API
app.get('/api/all', api.listAll);

app.get('/api/my', api.listMine);

app.put('/api/my/new', api.create);
app.put('/api/my/:id/in-progress', api.toInProgress);
app.put('/api/my/:id/done', api.toDone);
app.delete('/api/my/:id', api.delete);


app.listen(app.get('port'), function () {
	console.log('✔Express server listening on http://localhost:%d/', app.get('port'));
});
