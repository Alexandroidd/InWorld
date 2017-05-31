

const express			= require('express');
const bodyParser		= require('body-parser');
const app					= express();
const router				= express.Router();
const port					= process.env.PORT || 3000;



app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());



//Serve static files from Public//
app.use(express.static(__dirname + '/public'));


//INDEX ROUTE //

app.get('https://d-people-party.firebaseio.com/.json', function getCharacters(req,res){
console.log(res);
});




// Start Server //
app.listen(process.env.PORT || 3000, function(){
	console.log('Server starting on, ' + port);
});




