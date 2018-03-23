var express = require('express');
var request = require('request');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var setupResponse;
var Promise = require('promise');
var config = require('./config.json');

//Returns the index page
function index(req, res) {
  res.render('./index');
};


function executePayment(req, res) {
    var initializePromise = initialize(req, res);
    initializePromise.then(function(result) {
    	res.send(result);
    }, function(err) {
        console.log(err);
    })
}

function initialize(req, res){
	var headers = {
		'Content-Type' : 'application/json',
		'X-API-Key' : config.X_API_Key
	};

	var data = {
		"amount":{
			"currency": "EUR", "value": req.body.price
		},
		"reference": "1",
		"merchantAccount": "PaloITCOM",
		"shopperReference": req.body.email,
		"channel": "Web",
		"html": true,
		"origin": "http://localhost:3000",
		"returnUrl": "http://localhost:3000/checkout/result", 
		"countryCode": "FR", 
		"shopperLocale": "fr_FR"
	};

	var options = {
	    url: 'https://checkout-test.adyen.com/services/PaymentSetupAndVerification/v32/setup',
	    method: 'POST',
	    headers: headers,
	    body: JSON.stringify(data)
	};


	return new Promise(function(resolve, reject) {
     // Do async job
        request(options, function(err, resp, body) {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(body));
            }
        })
    })

}


function setupPayment(req, res){
	res.render('./setupPayment', {setupResponse:setupResponse});
}

module.exports = {
  router:router,
  index:index,
  setupPayment:setupPayment,
  executePayment:executePayment
};
