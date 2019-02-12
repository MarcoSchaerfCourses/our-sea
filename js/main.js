var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setPixelRatio( window.devicePixelRatio );
document.body.appendChild( renderer.domElement );

window.addEventListener( "resize", function(){
	var width= window.innerWidth;
	var height= window.innerHeight;
	renderer.setSize( width, height);
	camera.aspect= width/height;
	camera.updateProjectionMatrix();
	//phone loader
	//camera.position.set(-5, 12, 10);
	//camera.lookAt( scene.position );


});



//shape
var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshBasicMaterial( { color: 0xffffff, wireframe:true } );

var cube = new THREE.Mesh( geometry, material );
scene.add(

	cube

 );
/*
camera.position.z = 3;
var animate = function () {
	requestAnimationFrame( animate );
	cube.rotation.x += 0.01;
	cube.rotation.y += 0.005;
  renderer.render( scene, camera );
			};
*/





			/////////////////////////////////////////
			// Lighting
			/////////////////////////////////////////

			var iphone_color  = '#FAFAFA',
			    ambientLight  = new THREE.AmbientLight( '#EEEEEE' ),
			    hemiLight     = new THREE.HemisphereLight( iphone_color, iphone_color, 0 ),
			    light         = new THREE.PointLight( iphone_color, 1, 100 );

			hemiLight.position.set( 0, 50, 0 );
			light.position.set( 0, 20, 10 );

			scene.add( ambientLight );
			scene.add( hemiLight );
			scene.add( light );


			/////////////////////////////////////////
			// Utilities
			/////////////////////////////////////////

			var axisHelper = new THREE.AxisHelper( 1.25 );
			scene.add( axisHelper );


			/////////////////////////////////////////
			// Render Loop
			/////////////////////////////////////////

			function renderPhone() {
			  renderer.render( scene, camera );
			}

			// Render the scene when the controls have changed.
			// If you don’t have other animations or changes in your scene,
			// you won’t be draining system resources every frame to render a scene.
			//controls.addEventListener( 'change', renderPhone );

			// Avoid constantly rendering the scene by only
			// updating the controls every requestAnimationFrame
			function animationLoop() {
			  requestAnimationFrame(animationLoop);
			  //controls.update();
			}

			animationLoop();


			/////////////////////////////////////////
			// Window Resizing
			/////////////////////////////////////////

			window.addEventListener( 'resize', function () {
			  camera.aspect = window.innerWidth / window.innerHeight;
			  camera.updateProjectionMatrix();
			  renderer.setSize( window.innerWidth, window.innerHeight );
			    //controls.handleResize();
			    renderPhone();
			}, false );


			/////////////////////////////////////////
			// Object Loader
			/////////////////////////////////////////

			var dae,
			    loader = new THREE.ColladaLoader();

			function loadCollada(  ) {
			  dae = collada.scene;
			  dae.position.set(0.4, 0, 0.8);
			  scene.add(dae);
			  renderPhone();
			}

			loader.options.convertUpAxis = true;
			loader.load( './img/iphone6.dae', loadCollada);






// start functions

//loadCollada();

//animate();
