





function onDocumentMouseClick(event) {
          //event.preventDefault();
          var mouses = { x : 0, y : 0 };
          //mouses.x = ( ( event.clientX - renderer.domElement.offsetLeft ) / window.innerWidth ) * 2 - 1;
          //mouses.y = - ( ( event.clientY - renderer.domElement.offsetTop ) / window.innerHeight ) * 2 + 1;
          mouses.x =( ( event.clientX - renderer.domElement.offsetLeft ) / window.innerWidth )*100;
          mouses.y = - ( ( event.clientY - renderer.domElement.offsetTop ) / window.innerHeight)*100;


          var vec = new THREE.Vector3(); // create once and reuse
          var pos = new THREE.Vector3(); // create once and reuse

          vec.set(
              ( event.clientX / window.innerWidth ) * 2 - 1,
              - ( event.clientY / window.innerHeight ) * 2 + 1,
              0.5 );

          vec.unproject( camera );

          vec.sub( camera.position ).normalize();

          var distance = - camera.position.z / vec.z;

          pos.copy( camera.position ).add( vec.multiplyScalar( distance ) );

          var m=mesh_food.clone()

          //pos.x=Math.round(pos.x);
          m.position.set(pos.x,pos.y,10);

          food.push(m);
          //m.rotation.x += 0.005;
          //m.rotation.y += 0.01;

          scene.add(m);

          render();

      }



      function init() {
        clock = new THREE.Clock();
				camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 1, 1000 );
				camera.position.set(0,0,50);
				camera.rotation.x=0.1;
				scene = new THREE.Scene();
				//var texture = new THREE.TextureLoader().load( 'textures/crate.gif' );
        pointLight = new THREE.DirectionalLight( 0xffffff ,1);
        pointLight.castShadow=true;
        hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 1.0 );
        hemiLight.position.set(camera.position );
        hemiLight.color.setHSL( 0.6, 1, 0.6 );
				hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
				hemiLight.position.set( 0, 50, 0 );



        //pointLight.target=
        pointLight.position.set(camera.position);
        //pointLight.lookAt(0,0,0);

        var geometry = new THREE.BoxBufferGeometry( 5, 5, 5 );
				//var material = new THREE.MeshBasicMaterial( { map: texture } );
        var material = new THREE.MeshBasicMaterial( { color: 0xffffff, wireframe:true } );
				var geometry_bottom = new THREE.BoxBufferGeometry( 9999, 9999, 0.5 );
				var material_bottom = new THREE.MeshBasicMaterial( { color: 0x002a8c } );

        var material_food = new THREE.MeshBasicMaterial( { color: 0xffffff } );

				var bottom=new THREE.Mesh( geometry_bottom, material_bottom );
				bottom.position.set(0,0,0);
        bottom.receiveShadow=true;
				fish = new THREE.Mesh( geometry, material );
				fish.position.set(0,0,50);

        //
        //scene.fog = new THREE.Fog( scene.background, 1, 5000 );
        scene.background = new THREE.Color().setHSL( 0.6, 0, 1 );
        //
        var geometry_food=new THREE.BoxBufferGeometry( 0.5, 0.5, 0.5 );
        mesh_food = new THREE.Mesh( geometry_food, material_food );

        scene.add(
          //fish,
          bottom,pointLight,
          hemiLight
         );
        //scene.add(mesh_food);
				renderer = new THREE.WebGLRenderer( { antialias: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				document.body.appendChild( renderer.domElement );
				//
				window.addEventListener( 'resize', onWindowResize, false );
        document.addEventListener('click', onDocumentMouseClick);
				//checkbox

        load_fish();

			}
			function onWindowResize() {
				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();
				renderer.setSize( window.innerWidth, window.innerHeight );
			}
			function animate() {
				requestAnimationFrame( animate );
				//mesh.rotation.x += 0.005;
				//mesh.rotation.y += 0.01;
        //fish.rotation.y+=0.01;
        //fish.rotation.x+=0.01;
        check_food();

				render();

			}





      function render() {
      				var delta = clock.getDelta();

      				renderer.render( scene, camera );
      			}
			function dev() {
  			var x = document.getElementById("orbit_controls");
			  if(x.checked==true){
					//orbit OrbitControl
					controls = new THREE.OrbitControls( camera, renderer.domElement );

					console.log("dev")
					console.log(controls.getPolarAngle())
				}else {
					//nope
				}

			}
function load_fish(){

  loader.load(
	// resource URL
	"img/fish0.2.json",

	// onLoad callback
	// Here the loaded data is assumed to be an object
	function ( obj ) {
		// Add the loaded object to the scene
    fish=obj;

		scene.add( fish );


    fish.rotation.set(0,0,0);
    fish.scale.multiplyScalar(4.0);
    fish.position.set(0,0,10);
    //fish.rotation.set(0,0,0);
    //fish.rotation.set(0,0,0);
    //console.log(fish.rotation);
    fish.castShadow=true;
    //console.log(obj.position);
    zAxis = new THREE.Vector3(0,0,1);
    xAxis = new THREE.Vector3(1,0,0);
    yAxis = new THREE.Vector3(1,0,0);
//rotateAroundWorldAxis(fish, zAxis, Math.PI / 180);
    animate();
	},

	// onProgress callback
	function ( xhr ) {
		console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
	},

	// onError callback
	function ( err ) {
		console.error( 'An error happened' );
	}
);
/*loader.load(
	// resource URL
	"img/fin.json",

	// onLoad callback
	// Here the loaded data is assumed to be an object
	function ( obj ) {
		// Add the loaded object to the scen
    fin=obj;
    fin.position.set(fish.position.x,fish.position.y,fish.position.z);
    //fin.scale.multiplyScalar(4.0);
    fin.castShadow=true;
		fish.add( fin );
    /*fin.rotation.y=0.109;
    fin.rotation.x=-1.0378443964682147;
    fin.rotation.z=1.4;
    fin.position.y=-2.49;
    fin.position.x=-1.11;
    fin.position.z=-3.78;
    fish.position.set(0,0,10);

	},

	// onProgress callback
	function ( xhr ) {
		console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
	},

	// onError callback
	function ( err ) {
		console.error( 'An error happened' );
	}
);*/


//load fin


// Alternatively, to parse a previously loaded JSON structure
//var object = loader.parse( "img/fish.json" );

//scene.add( object );


}


var rotObjectMatrix;
function rotateAroundObjectAxis(object, axis, radians) {
    rotObjectMatrix = new THREE.Matrix4();
    rotObjectMatrix.makeRotationAxis(axis.normalize(), radians);

    object.matrix.multiply(rotObjectMatrix);

    object.rotation.setFromRotationMatrix(object.matrix);
}
var rotWorldMatrix;
// Rotate an object around an arbitrary axis in world space
function rotateAroundWorldAxis(object, axis, radians) {
    rotWorldMatrix = new THREE.Matrix4();
    rotWorldMatrix.makeRotationAxis(axis.normalize(), radians);

    // old code for Three.JS pre r54:
    //  rotWorldMatrix.multiply(object.matrix);
    // new code for Three.JS r55+:
    rotWorldMatrix.multiply(object.matrix);                // pre-multiply

    object.matrix = rotWorldMatrix;

    // old code for Three.js pre r49:
    // object.rotation.getRotationFromMatrix(object.matrix, object.scale);
    // old code for Three.js pre r59:
    // object.rotation.setEulerFromRotationMatrix(object.matrix);
    // code for r59+:
    object.rotation.setFromRotationMatrix(object.matrix);
}
