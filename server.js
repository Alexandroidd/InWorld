'use strict'

const express			= require('express');
const bodyParser		= require('body-parser');
const app					= express();
const router				= express.Router();
const port					= process.env.PORT || 3000;



app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());



//Serve static files from Public//
app.use(express.static(__dirname + '/public'));


// INDEX ROUTE //
// router.route('/world')
// .get( function getHome(req,res){
// 	res.sendFile(__dirname + 'worldPage.html');
// });




// Start Server //
app.listen(process.env.PORT || 3000, function(){
	console.log('Server starting on, ' + port);
});