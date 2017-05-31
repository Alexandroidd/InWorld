var controlla;

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
function makeGoat(saying, character, name) {
	saying = saying;
	character = character;
	name = name;
	var goatLoader = new THREE.OBJLoader();
  	goatLoader.load('objs/goat.obj', function(object){
	// var material = new THREE.MeshLambertMaterial({color:0xFF0000});
	object.scale.y = object.scale.x = object.scale.z = 0.1;
	object.name = name;
	
	object.traverse( function ( child ) {
    if ( child instanceof THREE.Mesh )
        child.material.color.setRGB (1, 0, 0);
    	child.position.set(goatPosition.x, goatPosition.y, goatPosition.z);
		// goatPosition = child.position;

	});
	scene.add(object);
	makeText(saying, goatPosition, character, name);
	goatPosition.z -= 50;
	
  	});
 }

// makes a rat
function makeRat(saying, character, name) {
	saying = saying;
	character = character;
	name = name;
	var ratLoader = new THREE.OBJLoader();
	ratLoader.load('objs/rat.obj', function(object){
		object.scale.y = object.scale.x = object.scale.z = 1;
		object.name = name;

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
function makeRhino(saying, character, name) {
	saying = saying;
	character = character;
	name = name;
	
	var rhinoLoader = new THREE.OBJLoader();
	rhinoLoader.load('objs/rhino.obj', function(object){
		object.scale.y = object.scale.x = object.scale.z = 2;
		object.name = name;

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
function checkCharacter(character, text, name) {
		  	character = character;
		  	text = text;
		  	name = name;
		  	switch(character) {
		  		case 'Goat':
			  		makeGoat(text, character, name);
			  		break;
			  	case 'Rat':
			  		makeRat(text, character, name);
			  		break;
			  	case 'Rhino':
			  		makeRhino(text, character, name);
			  		break;
			  	default:
			  		console.log('no animals to make');
		  	}
		  }

// End of Animal make/check functions ////////////


//---------------------------------//
/////////////////////////////////////
///////  EDITING FUNCTIONS //////////
/////////////////////////////////////
/////////////////////////////////////

	// changes any field to --> 'value'
	controlla.onFinishChange(function(value){
		value = value;
		getMyCharacter(value);
		console.log('The new Value is ' + value);
	});


///////////////////////////
// NON THREE JS FUNCTION //
// DEFINITION SPACE ///////
///////////////////////////


// this gets the curent character
// that you're logged in with
// its used to edit characters on the fly
function getMyCharacter(valueToChange){
	var lastItemKey;
	var lastName;
	valueToChange = valueToChange;
	database.ref('/characters/').limitToLast(1).on('child_added', function(snapshot){
		lastItemKey = snapshot.key;
		lastItem = snapshot.val();
		// console.log('last entered char was ' + lastItem.name);
	});

	firebase.database().ref('characters/' + lastItemKey).set({
    character: lastItem.character,
    name: lastItem.name,
    saying: valueToChange,
    whatChanged: 'saying'
  });
}




// gets player data from firebase to be used by functions //
	function pullCharacters(){
		database.ref('/characters').orderByChild("character").on("child_added", function(snapshot) {
		  var names = snapshot.val();
		  checkCharacter(names.character, names.saying, names.name);
		  // console.log(names.name);   
		});
	}


// looks for updates in any child nodes of 'characters'
	function updateCharacters(){
	var charName;

	// console.log(scene.children);
		database.ref('/characters').on('child_changed', function(snapshot){
			var names = snapshot.val();
			var obj = scene.getObjectByName(names.name);
			var objName = names.name +'text';

			if(names.whatChanged == 'saying'){
				var textToEdit = scene.getObjectByName(objName);
				console.log(textToEdit);
				scene.remove(textToEdit);
				
				var newCanvas = document.createElement('canvas');
				var newContext = newCanvas.getContext('2d');

				newContext.font = 'Bold 20px Arial';

				newContext.fillStyle = 'rgba(255,0,0,0.95';
				newContext.fillText(names.saying, 0, 50);

				//canvas contents used as a texture
				var newTexture = new THREE.Texture(newCanvas);
				newTexture.needsUpdate = true;

				var newMaterial = new THREE.MeshBasicMaterial(
					{map: newTexture, side: THREE.DoubleSide});
				newMaterial.transparent = true;

				var newMesh = new THREE.Mesh(
					new THREE.PlaneGeometry(
						newCanvas.width,
						newCanvas.height), newMaterial);

				newMesh.position.set(obj.position.x+100, obj.position.y+50, obj.position.z);
				newMesh.name = objName;

				scene.add(newMesh);

           		
           		

			// var prev = prevChild.val();
			// console.log(names);
			// console.log('this is prev ' + prev);
			// console.log(names.name);
			// charName = names.name;
			// var objToDelete = scene.getObjectByName(charName);
			// scene.remove(objToDelete);

			// var textToEdit = scene.getObjectByName(charName + 'text');
			// scene.remove(objToDelete2);
			// checkCharacter(names.character, names.saying, names.name);

		}
	});
}





/////////////////////////////
/// NON THREE JS FUNCTIONS///
/////// RUN SPACE ///////////
/////////////////////////////


	pullCharacters();
	updateCharacters();
	



}); // << -- END OF DOCU READY -- >> //




//global
var scene, camera, renderer, controls;


init();
animate();


function init(){

	scene = new THREE.Scene();

	camera = new THREE.PerspectiveCamera(105, 
		window.innerWidth/window.innerHeight,
		0.1,
		30000
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


	///////////////
	// GUI MAKER //
	///////////////
	var gui = new dat.GUI();
	var parameters = 
	{
		a: 200, //numeric
		b: 200, //numeric slider
		c: 'Hello, GUI', //string
		d: false, // boolean (checkbox)
		e: '#ff8800', //color(hex)
		f: function() {alert('Hello!')},
		g: function() {alert (parameters.c)},
		v: 0, //dummy value, only type is impt
		w: '...', // dummy value, only type is important
		x: 0, y: 0, z: 0
	};

	// gui.add(parameters)

	gui.add(parameters, 'a').name('Number');
	gui.add(parameters, 'b').min(128).max(256).step(16).name('Slider');
	controlla = gui.add(parameters, 'c').name('String');
	gui.add(parameters, 'f').name('Say Hello');









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
	function makeText(text, posit, character, name){
	character = character;
	text = text;
	posit = posit;
	name = name;
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


		mesh1.name = name + 'text';
	if (character == 'Goat'){
		mesh1.position.set(posit.x+100,posit.y+50,posit.z);
	} else if (character == 'Rhino'){
		mesh1.position.set(posit.x+100, posit.y+65, posit.z+100);
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




