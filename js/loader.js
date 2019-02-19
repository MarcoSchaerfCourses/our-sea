





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
	"img/fish.json",

	// onLoad callback
	// Here the loaded data is assumed to be an object
	function ( obj ) {
		// Add the loaded object to the scene
    fish=obj;
		scene.add( obj );
    fish.position.set(0,0,10);
    fish.scale.multiplyScalar(2.0);
    fish.castShadow=true;
    console.log(obj.position);
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


// Alternatively, to parse a previously loaded JSON structure
//var object = loader.parse( "img/fish.json" );

//scene.add( object );


}
