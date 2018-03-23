var express = require('express');
var app = express();
var paymentController = require('./paymentController');
app.use('/', paymentController.router);

//app.engine('html', require('ejs').renderFile);
app.engine('html', require('ejs').__express);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.use(express.static('public'));

module.exports = {
	app:app,
	express:express
};