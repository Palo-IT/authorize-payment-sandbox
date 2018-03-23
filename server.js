var app = require('./app').app;
var server = require('http').createServer(app);
var paymentController = require('./paymentController');
var curl = require('curl');

//Get index
app.get('/', paymentController.index);

//Pay
//app.get('/pay', paymentController.transact);

//API post trade
//app.get('/checkout/result', paymentController.payment);

app.get('/setupPayment', paymentController.setupPayment)

app.post('/setupPayment', paymentController.executePayment)
server.listen(3000);

module.exports = server;


