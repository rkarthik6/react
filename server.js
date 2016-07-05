// Module Dependencies
var express = require('express'),
	app = express();

app.use(express.static('./src'));
app.use(express.static('./node_modules/bootstrap/dist'));

// Assign port address
var port = process.env.PORT || 4000;

// Create Server
app.listen(port, function(){
	console.log("Listening on port : ",port);
});