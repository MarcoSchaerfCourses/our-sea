
			var camera, scene, renderer;
			var mesh;
			var food=[];

			function init() {
				camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 1, 1000 );
				camera.position.set(0,0,400);
				camera.rotation.x=0.1;
				scene = new THREE.Scene();
				//var texture = new THREE.TextureLoader().load( 'textures/crate.gif' );


        var geometry = new THREE.BoxBufferGeometry( 50, 50, 50 );
				//var material = new THREE.MeshBasicMaterial( { map: texture } );
        var material = new THREE.MeshBasicMaterial( { color: 0xffffff, wireframe:true } );
				var geometry_bottom = new THREE.BoxBufferGeometry( 9999, 9999, 0.5 );
				var material_bottom = new THREE.MeshBasicMaterial( { color: 0x002a8c } );

        var material_food = new THREE.MeshBasicMaterial( { color: 0xffffff } );

				var bottom=new THREE.Mesh( geometry_bottom, material_bottom );
				mesh = new THREE.Mesh( geometry, material );
				mesh.position.set(0,0,50);

        var geometry_food=new THREE.BoxBufferGeometry( 2, 2, 2 );
        mesh_food = new THREE.Mesh( geometry_food, material_food );

        scene.add( mesh,bottom );
        //scene.add(mesh_food);
				renderer = new THREE.WebGLRenderer( { antialias: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				document.body.appendChild( renderer.domElement );
				//
				window.addEventListener( 'resize', onWindowResize, false );
        document.addEventListener('click', onDocumentMouseClick);
				//checkbox



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
				render();

			}


			function animate_food(food) {


				render();

			}


      function render(){
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


                // particle
                /*var dotGeometry = new THREE.Geometry();
                dotGeometry.vertices.push(new THREE.Vector2( mouses.x, 1, mouses.y));
                var dotMaterial = new THREE.PointsMaterial( { color: 0xffffff, size: 100, sizeAttenuation: false } );
                var dot = new THREE.Points( dotGeometry, dotMaterial );
                scene.add( dot );*/

                //mesh_food = new THREE.Mesh( geometry_food, material );
                var m=mesh_food.clone()
                m.position.set(pos.x,pos.y,pos.z);

								food.push(m);
								//m.rotation.x += 0.005;
								//m.rotation.y += 0.01;

								scene.add(m);
								//animate_food(m);



                console.log(pos);
                render();

            }
				init();
				render();
				animate();
