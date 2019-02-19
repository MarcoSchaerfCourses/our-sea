



			var camera, scene, renderer,pointLight,hemiLight,clock;
			var fish;
			var cube;
			var food=[];
			var velocity=1;
	    var step=0.5;
			var loader = new THREE.ObjectLoader();





				init();
				render();
				animate();

				//setInterval(requestAnimationFrame(animation),16);
				//setInterval(check_food,5);

				//setInterval(requestAnimationFrame(animate),30);
