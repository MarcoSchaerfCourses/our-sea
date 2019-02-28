
//init everything for THREEJS
function init(){


  // To work with THREEJS, you need a scene, a camera, and a renderer

  // create the scene;
  scene = new THREE.Scene();

  // create the camera
  HEIGHT = window.innerHeight;
  WIDTH = window.innerWidth;
  aspectRatio = WIDTH / HEIGHT;
  fieldOfView = 90;
  nearPlane = 1; // the camera won't "see" any object placed in front of this plane
  farPlane = 3000; // the camera wont't see any object placed further than this plane
  camera = new THREE.PerspectiveCamera(
    fieldOfView,
    aspectRatio,
    nearPlane,
    farPlane);
  //camera.position.set(-62,1000,0.57);
  //camera.rotation.set(-1.5,0,-1.5);
  camera.position.z=1000;

  //create the renderer
  renderer = new THREE.WebGLRenderer({alpha: true, antialias: true });
  renderer.setSize(WIDTH, HEIGHT);
  container = document.getElementById('world');
  container.appendChild(renderer.domElement);
  if(params.debug){
    controls = new THREE.OrbitControls( camera, renderer.domElement);
  }


  // convert the field of view to radians
  var ang = (fieldOfView/2)* Math.PI / 180;
  // calculate the max y position seen by the camera related to the maxParticlesZ position, I start by calculating the y limit because fielOfView is a vertical field of view. I then calculate the x Limit
  yLimit = (camera.position.z + maxParticlesZ) * Math.tan(ang); // this is a formula I found, don't ask me why it works, it just does :)
  // Calculate the max x position seen by the camera related to the y Limit position
  xLimit = yLimit *camera.aspect;

  // precalculate the center of the screen, used to update the speed depending on the mouse position
  windowHalfX = WIDTH / 2;
  windowHalfY = HEIGHT / 2;



 // handling resize and mouse move events
  window.addEventListener('resize', onWindowResize, false);
  document.addEventListener('mousemove', handleMouseMove, false);

  // let's make it work on mobile too
  document.addEventListener('touchstart', handleTouchStart, false);
	document.addEventListener('touchend', handleTouchEnd, false);
	document.addEventListener('touchmove',handleTouchMove, false);
}


//used for Stats.js
function createStats() {

  stats = new Stats();
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.top = '0px';
  stats.domElement.style.right = '0px';
  container.appendChild(stats.domElement);
}

// Lights
// I use 2 lights, an hemisphere to give a global ambient light
// And a harder light to add some shadows
function createLight() {
  light = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.2)
  scene.add(light);
  shadowLight = new THREE.DirectionalLight(0xffffff, .8);
  shadowLight.position.set(1, 1, 1);
 	scene.add(shadowLight);
}

//FISH
//create the different fishes
function createFish() {
  scene.remove(fish);
  if(params.fishType=="normal"){
    createFishBasic();
  }else if(params.fishType=="piranha"){
    createFishPiranha();
  }else if(params.fishType=="textured"){
    createFishTexture();
  }else if(params.fishType=="nemo"){
    createFishNemo();
  }
}
//Normal Fish
function createFishBasic(){
  fishFastColor = {r:90, g:63, b:63}; // pastel blue
  fishSlowColor = {r:0, g:192, b:213}; // purple
  // A group that will contain each part of the fish
  fish = new THREE.Group();
  // each part needs a geometry, a material, and a mesh

  // Body
  var bodyGeom = new THREE.BoxGeometry(240, 80, 80);
 	var bodyMat = new THREE.MeshLambertMaterial({
    color: 0x80f5fe ,

  });
  bodyFish = new THREE.Mesh(bodyGeom, bodyMat);

  // Tail
  var tailGeom = new THREE.CylinderGeometry(0, 60, 60, 4, false);
 	var tailMat = new THREE.MeshLambertMaterial({
    color: 0x053fff,

  });

  tailFish = new THREE.Mesh(tailGeom, tailMat);
  tailFish.scale.set(1.5,1,0.3);
  tailFish.position.x = -130;
  tailFish.rotation.z = -halfPI;

  // Lips
  var lipsGeom = new THREE.BoxGeometry(25, 10, 120);
  var lipsMat = new THREE.MeshLambertMaterial({
    color: 0x80f5fe ,

  });
  lipsFish = new THREE.Mesh(lipsGeom, lipsMat);
  lipsFish.position.x = 65;
  lipsFish.position.y = -47;
  lipsFish.rotation.z = halfPI;

  // Fins
  topFish = new THREE.Mesh(tailGeom, tailMat);
  topFish.scale.set(1.2,1,.1);
  topFish.position.x = -20;
  topFish.position.y = 40;
  topFish.rotation.z = -halfPI;

  sideRightFish = new THREE.Mesh(tailGeom, tailMat);
  sideRightFish.scale.set(1.2,2,.2);
  sideRightFish.rotation.x = halfPI;
  sideRightFish.rotation.z = -halfPI;
  sideRightFish.position.x = 0;
  sideRightFish.position.y = -40;
  sideRightFish.position.z = -30;

  sideLeftFish = new THREE.Mesh(tailGeom, tailMat);
  sideLeftFish.scale.set(1.2,2,.2);
  sideLeftFish.rotation.x = halfPI;
  sideLeftFish.rotation.z = -halfPI;
  sideLeftFish.position.x = 0;
  sideLeftFish.position.y = -40;
  sideLeftFish.position.z = 30;

  // Eyes
  var eyeGeom = new THREE.BoxGeometry(40, 40,5);
  var eyeMat = new THREE.MeshLambertMaterial({
    color: 0xffffff,

  });

  rightEye = new THREE.Mesh(eyeGeom,eyeMat );
  rightEye.position.z = -60;
  rightEye.position.x = 25;
  rightEye.position.y = -10;

  var irisGeom = new THREE.BoxGeometry(10, 10,3);
  var irisMat = new THREE.MeshLambertMaterial({
    color: 0x330000,

  });

  rightIris = new THREE.Mesh(irisGeom,irisMat );
  rightIris.position.z = -65;
  rightIris.position.x = 35;
  rightIris.position.y = -10;

  leftEye = new THREE.Mesh(eyeGeom,eyeMat );
  leftEye.position.z = 60;
  leftEye.position.x = 25;
  leftEye.position.y = -10;

  leftIris = new THREE.Mesh(irisGeom,irisMat );
  leftIris.position.z = 65;
  leftIris.position.x = 35;
  leftIris.position.y = -10;

  var toothGeom = new THREE.BoxGeometry(20, 4, 20);
  var toothMat = new THREE.MeshLambertMaterial({
    color: 0xffffff,

  });

  // Teeth
  tooth1 = new THREE.Mesh(toothGeom,toothMat);
  tooth1.position.x = 65;
  tooth1.position.y = -35;
  tooth1.position.z = -50;
  tooth1.rotation.z = halfPI;
  tooth1.rotation.x = -halfPI;

  tooth2 = new THREE.Mesh(toothGeom,toothMat);
  tooth2.position.x = 65;
  tooth2.position.y = -30;
  tooth2.position.z = -25;
  tooth2.rotation.z = halfPI;
  tooth2.rotation.x = -Math.PI/12;

  tooth3 = new THREE.Mesh(toothGeom,toothMat);
  tooth3.position.x = 65;
  tooth3.position.y = -25;
  tooth3.position.z = 0;
  tooth3.rotation.z = halfPI;

  tooth4 = new THREE.Mesh(toothGeom,toothMat);
  tooth4.position.x = 65;
  tooth4.position.y = -30;
  tooth4.position.z = 25;
  tooth4.rotation.z = halfPI;
  tooth4.rotation.x = Math.PI/12;

  tooth5 = new THREE.Mesh(toothGeom,toothMat);
  tooth5.position.x = 65;
  tooth5.position.y = -35;
  tooth5.position.z = 50;
  tooth5.rotation.z = halfPI;
  tooth5.rotation.x = Math.PI/8;


  fish.add(bodyFish);
  fish.add(tailFish);
  fish.add(topFish);
  fish.add(sideRightFish);
  fish.add(sideLeftFish);
  fish.add(rightEye);
  fish.add(rightIris);
  fish.add(leftEye);
  fish.add(leftIris);
  /*fish.add(tooth1);
  fish.add(tooth2);
  fish.add(tooth3);
  fish.add(tooth4);
  fish.add(tooth5);
  fish.add(lipsFish);*/

  fish.rotation.y = -Math.PI/4;
  scene.add(fish);
}
//Piranha Fish
function createFishPiranha(){
  fishFastColor = {r:90, g:63, b:63}; // pastel blue
  fishSlowColor = {r:0, g:192, b:213}; // purple
  // A group that will contain each part of the fish
  fish = new THREE.Group();
  // each part needs a geometry, a material, and a mesh

  // Body
  var bodyGeom = new THREE.BoxGeometry(120, 120, 120);
  var bodyMat = new THREE.MeshLambertMaterial({
    color: 0x80f5fe ,

  });
  bodyFish = new THREE.Mesh(bodyGeom, bodyMat);

  // Tail
  var tailGeom = new THREE.CylinderGeometry(0, 60, 60, 4, false);
  var tailMat = new THREE.MeshLambertMaterial({
    color: 0xff00dc,

  });

  tailFish = new THREE.Mesh(tailGeom, tailMat);
  tailFish.scale.set(.8,1,.1);
  tailFish.position.x = -60;
  tailFish.rotation.z = -halfPI;

  // Lips
  var lipsGeom = new THREE.BoxGeometry(25, 10, 120);
  var lipsMat = new THREE.MeshLambertMaterial({
    color: 0x80f5fe ,

  });
  lipsFish = new THREE.Mesh(lipsGeom, lipsMat);
  lipsFish.position.x = 65;
  lipsFish.position.y = -47;
  lipsFish.rotation.z = halfPI;

  // Fins
  topFish = new THREE.Mesh(tailGeom, tailMat);
  topFish.scale.set(.8,1,.1);
  topFish.position.x = -20;
  topFish.position.y = 60;
  topFish.rotation.z = -halfPI;

  sideRightFish = new THREE.Mesh(tailGeom, tailMat);
  sideRightFish.scale.set(.8,1,.1);
  sideRightFish.rotation.x = halfPI;
  sideRightFish.rotation.z = -halfPI;
  sideRightFish.position.x = 0;
  sideRightFish.position.y = -50;
  sideRightFish.position.z = -60;

  sideLeftFish = new THREE.Mesh(tailGeom, tailMat);
  sideLeftFish.scale.set(.8,1,.1);
  sideLeftFish.rotation.x = halfPI;
  sideLeftFish.rotation.z = -halfPI;
  sideLeftFish.position.x = 0;
  sideLeftFish.position.y = -50;
  sideLeftFish.position.z = 60;

  // Eyes
  var eyeGeom = new THREE.BoxGeometry(40, 40,5);
  var eyeMat = new THREE.MeshLambertMaterial({
    color: 0xffffff,

  });

  rightEye = new THREE.Mesh(eyeGeom,eyeMat );
  rightEye.position.z = -60;
  rightEye.position.x = 25;
  rightEye.position.y = -10;

  var irisGeom = new THREE.BoxGeometry(10, 10,3);
  var irisMat = new THREE.MeshLambertMaterial({
    color: 0x330000,

  });

  rightIris = new THREE.Mesh(irisGeom,irisMat );
  rightIris.position.z = -65;
  rightIris.position.x = 35;
  rightIris.position.y = -10;

  leftEye = new THREE.Mesh(eyeGeom,eyeMat );
  leftEye.position.z = 60;
  leftEye.position.x = 25;
  leftEye.position.y = -10;

  leftIris = new THREE.Mesh(irisGeom,irisMat );
  leftIris.position.z = 65;
  leftIris.position.x = 35;
  leftIris.position.y = -10;

  var toothGeom = new THREE.BoxGeometry(20, 4, 20);
  var toothMat = new THREE.MeshLambertMaterial({
    color: 0xffffff,

  });

  // Teeth
  tooth1 = new THREE.Mesh(toothGeom,toothMat);
  tooth1.position.x = 65;
  tooth1.position.y = -35;
  tooth1.position.z = -50;
  tooth1.rotation.z = halfPI;
  tooth1.rotation.x = -halfPI;

  tooth2 = new THREE.Mesh(toothGeom,toothMat);
  tooth2.position.x = 65;
  tooth2.position.y = -30;
  tooth2.position.z = -25;
  tooth2.rotation.z = halfPI;
  tooth2.rotation.x = -Math.PI/12;

  tooth3 = new THREE.Mesh(toothGeom,toothMat);
  tooth3.position.x = 65;
  tooth3.position.y = -25;
  tooth3.position.z = 0;
  tooth3.rotation.z = halfPI;

  tooth4 = new THREE.Mesh(toothGeom,toothMat);
  tooth4.position.x = 65;
  tooth4.position.y = -30;
  tooth4.position.z = 25;
  tooth4.rotation.z = halfPI;
  tooth4.rotation.x = Math.PI/12;

  tooth5 = new THREE.Mesh(toothGeom,toothMat);
  tooth5.position.x = 65;
  tooth5.position.y = -35;
  tooth5.position.z = 50;
  tooth5.rotation.z = halfPI;
  tooth5.rotation.x = Math.PI/8;


  fish.add(bodyFish);
  fish.add(tailFish);
  fish.add(topFish);
  fish.add(sideRightFish);
  fish.add(sideLeftFish);
  fish.add(rightEye);
  fish.add(rightIris);
  fish.add(leftEye);
  fish.add(leftIris);
  fish.add(tooth1);
  fish.add(tooth2);
  fish.add(tooth3);
  fish.add(tooth4);
  fish.add(tooth5);
  fish.add(lipsFish);

  fish.rotation.y = -Math.PI/4;
  scene.add(fish);
}
//Fish with a Texture of a Goldfish
function createFishTexture(){
  fishFastColor = {r:90, g:63, b:63}; // pastel blue
  fishSlowColor = {r:0, g:192, b:213}; // purple
  // A group that will contain each part of the fish
  fish = new THREE.Group();
  // each part needs a geometry, a material, and a mesh

  // Body
  var bodyGeom = new THREE.BoxGeometry(120, 120, 120);
  new THREE.TextureLoader().load( 'img/texture_gold.jpg', function ( texture ) {
					texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
					texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
					//texture.matrixAutoUpdate = false; // default true; set to false to update texture.matrix manually
					var bodyMat = new THREE.MeshBasicMaterial( { map: texture } );
          bodyFish = new THREE.Mesh(bodyGeom, bodyMat);

          // Tail
          var tailGeom = new THREE.CylinderGeometry(0, 60, 60, 4, false);
          var tailMat = new THREE.MeshLambertMaterial({
            color: 0x80f5fe ,

          });

          tailFish = new THREE.Mesh(tailGeom, tailMat);
          tailFish.scale.set(.8,1,.1);
          tailFish.position.x = -60;
          tailFish.rotation.z = -halfPI;



          // Fins
          topFish = new THREE.Mesh(tailGeom, tailMat);
          topFish.scale.set(.8,1,.1);
          topFish.position.x = -20;
          topFish.position.y = 60;
          topFish.rotation.z = -halfPI;

          sideRightFish = new THREE.Mesh(tailGeom, tailMat);
          sideRightFish.scale.set(.8,1,.1);
          sideRightFish.rotation.x = halfPI;
          sideRightFish.rotation.z = -halfPI;
          sideRightFish.position.x = 0;
          sideRightFish.position.y = -50;
          sideRightFish.position.z = -60;

          sideLeftFish = new THREE.Mesh(tailGeom, tailMat);
          sideLeftFish.scale.set(.8,1,.1);
          sideLeftFish.rotation.x = halfPI;
          sideLeftFish.rotation.z = -halfPI;
          sideLeftFish.position.x = 0;
          sideLeftFish.position.y = -50;
          sideLeftFish.position.z = 60;

          // Eyes
          var eyeGeom = new THREE.BoxGeometry(40, 40,5);
          var eyeMat = new THREE.MeshLambertMaterial({
            color: 0xffffff,

          });

          rightEye = new THREE.Mesh(eyeGeom,eyeMat );
          rightEye.position.z = -60;
          rightEye.position.x = 25;
          rightEye.position.y = -10;

          var irisGeom = new THREE.BoxGeometry(10, 10,3);
          var irisMat = new THREE.MeshLambertMaterial({
            color: 0x330000,

          });

          rightIris = new THREE.Mesh(irisGeom,irisMat );
          rightIris.position.z = -65;
          rightIris.position.x = 35;
          rightIris.position.y = -10;

          leftEye = new THREE.Mesh(eyeGeom,eyeMat );
          leftEye.position.z = 60;
          leftEye.position.x = 25;
          leftEye.position.y = -10;

          leftIris = new THREE.Mesh(irisGeom,irisMat );
          leftIris.position.z = 65;
          leftIris.position.x = 35;
          leftIris.position.y = -10;





          fish.add(bodyFish);
          fish.add(tailFish);
          fish.add(topFish);
          fish.add(sideRightFish);
          fish.add(sideLeftFish);
          fish.add(rightEye);
          fish.add(rightIris);
          fish.add(leftEye);
          fish.add(leftIris);


          //fish.rotation.y = -Math.PI/4;
          scene.add(fish);









				} );

}
//fedebyes Fish
function createFishNemo(){

  fishFastColor = {r:98, g:70, b:60}; // pastel blue
  fishSlowColor = {r:255, g:60, b:1}; // purple
  // A group that will contain each part of the fish
  fish = new THREE.Group();
  // each part needs a geometry, a material, and a mesh

  // Body
  var bodyGeom = new THREE.BoxGeometry(200, 150, 100);
 	var bodyMat = new THREE.MeshLambertMaterial({
    color: 0xff3c01 ,

  });
  bodyFish = new THREE.Mesh(bodyGeom, bodyMat);


  //spot1
  var spotGeom = new THREE.BoxGeometry(20, 151, 101);
  var spotMat = new THREE.MeshLambertMaterial({
    color: 0xffffff ,

  });
  spot1 = new THREE.Mesh(spotGeom,spotMat);
  spot2 = new THREE.Mesh(spotGeom,spotMat);
  spot2.position.x=-50;


  // Tail
  var tailGeom = new THREE.CylinderGeometry(0, 60, 60, 4, false);
 	var tailMat = new THREE.MeshLambertMaterial({
    color: 0xff3c01 ,

  });

  tailFish = new THREE.Mesh(tailGeom, tailMat);
  tailFish.scale.set(1,2,0.3);
  tailFish.position.x = -130;
  tailFish.rotation.z = -halfPI;

  // Lips
  var lipsGeom = new THREE.BoxGeometry(25, 10, 120);
  var lipsMat = new THREE.MeshLambertMaterial({
    color: 0xff3c01 ,

  });
  lipsFish = new THREE.Mesh(lipsGeom, lipsMat);
  lipsFish.position.x = 65;
  lipsFish.position.y = -47;
  lipsFish.rotation.z = halfPI;

  // Fins
  topFish = new THREE.Mesh(tailGeom, tailMat);
  topFish.scale.set(1,1,.3);
  topFish.position.x = 40;
  topFish.position.y = 80;
  topFish.rotation.z = -halfPI;


  //second top
  topFish2 = new THREE.Mesh(tailGeom, tailMat);
  topFish2.scale.set(1,1,.3);
  topFish2.position.x = -20;
  topFish2.position.y = 80;
  topFish2.rotation.z = -halfPI;

  sideRightFish = new THREE.Mesh(tailGeom, tailMat);
  sideRightFish.scale.set(1.2,2,.2);
  sideRightFish.rotation.x = halfPI;
  sideRightFish.rotation.z = -halfPI;
  sideRightFish.position.x = 0;
  sideRightFish.position.y = -40;
  sideRightFish.position.z = -30;

  sideLeftFish = new THREE.Mesh(tailGeom, tailMat);
  sideLeftFish.scale.set(1.2,2,.2);
  sideLeftFish.rotation.x = halfPI;
  sideLeftFish.rotation.z = -halfPI;
  sideLeftFish.position.x = 0;
  sideLeftFish.position.y = -40;
  sideLeftFish.position.z = 30;

  // Eyes
  var eyeGeom = new THREE.BoxGeometry(60, 100,5);
  var eyeMat = new THREE.MeshLambertMaterial({
    color: 0xffffff,

  });

  rightEye = new THREE.Mesh(eyeGeom,eyeMat );
  rightEye.position.z = -60;
  rightEye.position.x = 30;
  rightEye.position.y = -10;

  var irisGeom = new THREE.BoxGeometry(30, 30,2);
  var irisMat = new THREE.MeshLambertMaterial({
    color: 0x330000,

  });

  rightIris = new THREE.Mesh(irisGeom,irisMat );
  rightIris.position.z = -65;
  rightIris.position.x = 10;
  rightIris.position.y = -10;

  leftEye = new THREE.Mesh(eyeGeom,eyeMat );
  leftEye.position.z = 60;
  leftEye.position.x = 55;
  leftEye.position.y = -10;

  leftIris = new THREE.Mesh(irisGeom,irisMat );
  leftIris.position.z = 65;
  leftIris.position.x = 65;
  leftIris.position.y = -10;

  var toothGeom = new THREE.BoxGeometry(20, 4, 20);
  var toothMat = new THREE.MeshLambertMaterial({
    color: 0xffffff,

  });




  fish.add(bodyFish);
  fish.add(tailFish);
  fish.add(topFish);
  fish.add(sideRightFish);
  fish.add(sideLeftFish);
  fish.add(rightEye);
  fish.add(rightIris);
  fish.add(leftEye);
  fish.add(leftIris);
  fish.add(spot1);
  fish.add(spot2);
  //fish.add(topFish2);
  /*fish.add(tooth1);
  fish.add(tooth2);
  fish.add(tooth3);
  fish.add(tooth4);
  fish.add(tooth5);
  fish.add(lipsFish);*/

  fish.rotation.y = -Math.PI/4;
  scene.add(fish);
}


//Create GUI from dat-GUI.js
function createGUI(){


  gui= new dat.GUI();
  var f1=gui.addFolder("Debug");
  f1.add(params,"debug");
  f1.add(params,"alot");
  var f2=gui.addFolder("Fish");
  f2.add(params,"fishType",fishTypes).onChange(function(){
    createFish();
    //params.refresh=true;
  }

  );
  var f3=gui.addFolder("Pollution");
  f3.add(params,"waterPollution").min(minPollution).max(maxPollution).name("Water Purity");
  f3.add(params,"polluted");
  f3.add(params,"plastic");
  //gui.add(params,"dirt");
  f3.add(params,"chemical");

  //gui.add(params,"refresh");
  //f3.open();

}


// PARTICLES
function createParticle(){
  var particle, geometryCore, ray, w,h,d, sh, sv;

  // 3 different shapes are used, chosen randomly
  var rnd = Math.random();




  var color;
  var materialCore ;
  if(!params.polluted){
    ray = 35;
    sh = 4;
    sv =4;
    geometryCore = new THREE.SphereGeometry(ray, sh, sv);
    color="#80d7ff";
    materialCore=new THREE.MeshLambertMaterial({
     color: color,transparent:true,opacity:0.3

   });
  }else{
    if (rnd<.33 && params.plastic){
      w = 10 + Math.random()*30;
      h = 10 + Math.random()*30;
      d = 10 + Math.random()*30;
      geometryCore = new THREE.BoxGeometry(w,h,d);
    }
    // TETRAHEDRON
    else if (rnd<.66 && params.chemical){
      ray = 10 + Math.random()*20;
      geometryCore = new THREE.TetrahedronGeometry(ray);
    }
    // SPHERE... but as I also randomly choose the number of horizontal and vertical segments, it sometimes lead to wierd shapes
    else {
      ray = 5+Math.random()*30;
      sh = 2 + Math.floor(Math.random()*2);
      sv = 2 + Math.floor(Math.random()*2);
      geometryCore = new THREE.SphereGeometry(ray, sh, sv);
    }
    color=getRandomColor();
    materialCore=new THREE.MeshLambertMaterial({
     color: color,

   });
  }

  // Choose a color for each particle and create the mesh





  particle = new THREE.Mesh(geometryCore, materialCore);
  return particle;
}
