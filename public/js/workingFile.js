$(document).ready(function(){
	var database = firebase.database();


//////////////////////////////
// Seperate positioning for //
// different animal types ////
//////////////////////////////
	
	// Goat
	var goatPosition = new THREE.Vector3();
		goatPosition.x = 0;
		goatPosition.y = 0;
		goatPosition.z = -50;
		goatHeightAdd = 20;

	var ratPosition = new THREE.Vector3();
		ratPosition.x = -50;
		ratPosition.y = -2;
		ratPosition.z = 0;

	var rhinoPosition = new THREE.Vector3();
		rhinoPosition.x = 0;
		rhinoPosition.y = 16;
		rhinoPosition.z = 150;
	
	

////////////////////////////
// Functions that make /////
// and check animal types //
////////////////////////////


// makes a goat
function makeGoat(saying, character) {
	saying = saying;
	character = character;
	var goatLoader = new THREE.OBJLoader();
	
  	goatLoader.load('objs/goat.obj', function(object){
	// var material = new THREE.MeshLambertMaterial({color:0xFF0000});
	object.scale.y = object.scale.x = object.scale.z = 0.1;
	object.name = 'Goat';
	object.id = 2;
	
	object.traverse( function ( child ) {
    if ( child instanceof THREE.Mesh )
        child.material.color.setRGB (1, 0, 0);
    	child.position.set(goatPosition.x, goatPosition.y, goatPosition.z);
		// goatPosition = child.position;

	});
	scene.add(object);
	makeText(saying, goatPosition, character);
	goatPosition.z -= 50;
	
  	});
 }

// makes a rat
function makeRat(saying, character) {
	saying = saying;
	character = character;
	var ratLoader = new THREE.OBJLoader();
	ratLoader.load('objs/rat.obj', function(object){
		object.scale.y = object.scale.x = object.scale.z = 1;
		object.name = 'Rat';

		object.traverse(function (child){
			if(child instanceof THREE.Mesh)
				child.material.color.setRGB(0,1,0);
				child.position.set(ratPosition.x, ratPosition.y, ratPosition.z);
				
		});
		
		scene.add(object);
		makeText(saying, ratPosition, character);
		ratPosition.x -= 50;
	});
}

// makes a rhino
function makeRhino(saying, character) {
	saying = saying;
	character = character;
	
	var rhinoLoader = new THREE.OBJLoader();
	rhinoLoader.load('objs/rhino.obj', function(object){
		object.scale.y = object.scale.x = object.scale.z = 2;
		object.name = 'Rhino';

		object.traverse(function(child){
			if(child instanceof THREE.Mesh)
				child.material.color.setRGB(0,0,1);
				child.position.set(rhinoPosition.x, rhinoPosition.y, rhinoPosition.z);
				
		});
		scene.add(object);
		makeText(saying, rhinoPosition, character);
		rhinoPosition.z += 50;
	});
}


// checks which character to make
function checkCharacter(character, text) {
		  	character = character;
		  	text = text;

		  	switch(character) {
		  		case 'Goat':
			  		makeGoat(text, character);
			  		break;
			  	case 'Rat':
			  		makeRat(text, character);
			  		break;
			  	case 'Rhino':
			  		makeRhino(text, character);
			  		break;
			  	default:
			  		console.log('no animals to make');
		  	}
		  }

// End of Animal make/check functions ////////////



// gets player data from firebase to be used by functions //
	function pullCharacters(){
		var arr = [];
		// this works
		database.ref('/characters').orderByChild("character").on("child_added", function(snapshot) {
		  // console.log(snapshot.val());
		  var names = snapshot.val();
		  checkCharacter(names.character, names.saying);
		  
		  console.log(names.character);   
		  //<<<<---crucial use this!
		  
		});
		
		



	}




	// Functions to Run //
	pullCharacters();



});

//global
var scene, camera, renderer, controls;


init();
animate();


function init(){

	scene = new THREE.Scene();

	camera = new THREE.PerspectiveCamera(105, 
		window.innerWidth/window.innerHeight,
		0.1,
		20000
	);

	camera.position.set(0,150,400);
	camera.lookAt(scene.position);

	renderer = new THREE.WebGLRenderer({ antialias:
	true });

	// size shoudl be the same as the window
	renderer.setSize(window.innerWidth, window.innerHeight);

	// set a near white clear color (default is black)
	renderer.setClearColor(0xeeeeee);
	// var effect = new THREE.StereoEffect(renderer);

	// set renderer shadow
	// renderer.shadowMap.enabled = true;
	// renderer.shadowMap.type = THREE.PCFSoftShadowMap;

	// append to document
	document.body.appendChild(renderer.domElement);

	//Render the scene/camera combination
	renderer.render(scene,camera);

	// Events
	// THREEx.WindowResize(renderer, camera);


	// CONTROLS
	controls = new THREE.OrbitControls(camera, renderer.domElement);

	// LIGHT
	var light = new THREE.PointLight(0xffffff);
	light.position.set(0,250,0);
	var light2 = new THREE.PointLight(0xffffff);
	light2.position.set(0,300,400);
	scene.add(light);
	scene.add(light2);

	var ambientLight = new THREE.AmbientLight(0x111111);
	scene.add(ambientLight);

	var colorMine = new THREE.Color("rgb(255, 0, 0)");

	// FLOOR
	var loader = new THREE.TextureLoader();
	var floorTexture = loader.load('images/checkerboard.jpg', function(texture){
		floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
		floorTexture.repeat.set(10,10);
	});
	
	var floorMaterial = new THREE.MeshBasicMaterial({map: floorTexture, side: THREE.DoubleSide});
	var floorGeometry = new THREE.PlaneGeometry(1000,1000,1,1);
	var floor = new THREE.Mesh(floorGeometry, floorMaterial);
	floor.position.y = -0.5;
	floor.rotation.x = Math.PI / 2;
	scene.add(floor);


	// Goat Object
	var theGoat;

	var objLoader = new THREE.OBJLoader();
	objLoader.load('objs/goat.obj', function(object){
		// var material = new THREE.MeshLambertMaterial({color:0xFF0000});
		object.scale.y = object.scale.x = object.scale.z = 0.1;
		object.name = 'Goat';
		object.id = 2;
		object.traverse( function ( child ) {
        if ( child instanceof THREE.Mesh )
            child.material.color.setRGB (1, 0, 0);
        	
      
    });
		
		scene.add(object);
		
	});

	theGoat = scene.getObjectByName('Goat');
} // << --- end of init ---- >>


	// console.log(theGoat);
	

	// var lastIndex = scene.children.length-1;
	// theGoat = scene.children[3];
	// theGoat.name = 'goatman';
	// theGoat.material.color.setRGB(0,1,0);

	// console.log(theGoat.name);


	// add text
	function makeText(text, posit, character){
	character = character;
	text = text;
	posit = posit;
	var canvas1 = document.createElement('canvas');
	var context1 = canvas1.getContext('2d');

	if(character == 'Rat'){
		context1.font = 'Bold 15px Arial';
	} else {context1.font = 'Bold 20px Arial';}

	context1.fillStyle = 'rgba(255,0,0,0.95';
	context1.fillText(text, 0, 50);

	//canvas contents used as a texture
	var texture1 = new THREE.Texture(canvas1);
	texture1.needsUpdate = true;

	var material1 = new THREE.MeshBasicMaterial(
		{map: texture1, side: THREE.DoubleSide});
	material1.transparent = true;

	var mesh1 = new THREE.Mesh(
		new THREE.PlaneGeometry(
			canvas1.width,
			canvas1.height), material1);
	if (character == 'Goat'){
		mesh1.position.set(posit.x+100,posit.y+50,posit.z);
	} else if (character == 'Rhino'){
		console.log('I am a ' + character);
		mesh1.position.set(posit.x, posit.y+65, posit.z+100);
	} else if (character == 'Rat'){
		mesh1.position.set(posit.x+20, posit.y+30, posit.z);
	}
	scene.add(mesh1);
}



		
	//render it
	function animate(){
		requestAnimationFrame(animate);
		render();


	}

	function render(){
		renderer.render(scene,camera);
	}

	












// $.ajax({
// 	url: 'https://d-people-party.firebaseio.com/.json',
// 	type: 'POST',
// 	data: JSON.stringify(param),
// 	success: function(){
// 		alert('success');
// 	},
// 	error: function(error){
// 		alert('error: ' + error);
// 	}
// });



/////////////////////
// SAVE FOR LATER ///
/////////////////////
// database.ref('/characters').orderByChild("character").equalTo('Goat').on("child_added", function(snapshot) {
// 		  // console.log(snapshot.val());
// 		  var names = snapshot.val();
// 		  makeGoat();



// var lastCharacter = database.ref('/characters').length-1;

		// return database.ref('/characters').once('value').then(function(snapshot) {
		//   var name = snapshot.exportVal();

		//   console.log(name);
		// });
		// position = ()




