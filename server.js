

const express			= require('express');
const bodyParser		= require('body-parser');
const app					= express();
const router				= express.Router();
const port					= process.env.PORT || 3000;
const request				= require('request');



app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());



//Serve static files from Public//
app.use(express.static(__dirname + '/public'));



// drone info
app.get('/drones', function getDrones(req, res){
	let url = 'http://api.dronestre.am/data/';
	request (url, function(error, response, body){
		var parseBody = JSON.parse(body);
		var first = parseBody.strike[0].narrative;
		var second = parseBody.strike[1].narrative;
		var th = parseBody.strike[2].narrative;
		var four = parseBody.strike[3].narrative;
		var fifth = parseBody.strike[4].narrative;
		var sixth = parseBody.strike[5].narrative;
		res.json([first, second, th, four, fifth, sixth]);
	});
});
// amazing...this worked. fucking christ







// Start Server //
app.listen(process.env.PORT || 3000, function(){
	console.log('Server starting on, ' + port);
});




