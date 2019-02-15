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
var material2 = new THREE.MeshBasicMaterial( { color: 0xffffff, wireframe:true } );
var cube = new THREE.Mesh( geometry, material );
scene.add(

	cube

 );

camera.position.z = 3;
var animate = function () {
	requestAnimationFrame( animate );
	cube.rotation.x += 0.01;
	cube.rotation.y += 0.005;
  renderer.render( scene, camera );
			};






// start functions
animate();
