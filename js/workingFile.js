var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(105, 
	window.innerWidth/window.innerHeight,
	0.1,
	20000
);

camera.position.set(0,150,400);
camera.lookAt(scene.position);

var renderer = new THREE.WebGLRenderer({ antialias:
true });

// size shoudl be the same as the window
renderer.setSize(window.innerWidth, window.innerHeight);

// set a near white clear color (default is black)
renderer.setClearColor(0xeeeeee);

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
	scene.add(light);

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
	var goat = new THREE.Object3D();

	// function makeObject(object){
	// goat = object;
	// scene.add(goat);
	// }

	

	var objLoader = new THREE.OBJLoader();
	objLoader.load('objs/goat.obj', function(object){
		// var material = new THREE.MeshLambertMaterial({color:0xFF0000});
		object.scale.y = object.scale.x = object.scale.z = 0.1;
		object.traverse( function ( child ) {
        if ( child instanceof THREE.Mesh )
            child.material.color.setRGB (1, 0, 0);
    });

		scene.add(object);

	});
		
		// object.position.y = -;
		// scene.add(object);

		
	//render it
	function animate(){
		requestAnimationFrame(animate);
		render();
	}

	function render(){
		renderer.render(scene,camera);
	}

	animate();












