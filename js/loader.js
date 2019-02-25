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
  /*
  As I will recycle the particles, I need to know the left and right limits they can fly without disappearing from the camera field of view.
  As soon as a particle is out of the camera view, I can recycle it : remove it from the flyingParticles array and push it back in the waitingParticles array.
  I guess I can do that by raycasting each particle each frame, but I think this will be too heavy. Instead I prefer to precalculate the x coordinate from which a particle is not visible anymore. But this depends on the z position of the particle.
  Here I decided to use the furthest possible z position for a particle, to be sure that all the particles won't be recycled before they are out of the camera view. But this could be much more precise, by precalculating the x limit for each particle depending on its z position and store it in the particle when it is "fired". But today, I'll keep it simple :)
  !!!!!! I'm really not sure this is the best way to do it. If you find a better solution, please tell me
  */

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

function createFishBasic(){
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
    color: 0xff00dc,

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
  topFish.scale.set(.8,1,.1);
  topFish.position.x = -20;
  topFish.position.y = 40;
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
  /*fish.add(tooth1);
  fish.add(tooth2);
  fish.add(tooth3);
  fish.add(tooth4);
  fish.add(tooth5);
  fish.add(lipsFish);*/

  fish.rotation.y = -Math.PI/4;
  scene.add(fish);
}
function createFishPiranha(){
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

//Create GUI

function createGUI(){


  gui= new dat.GUI();
  gui.add(params,"debug");
  gui.add(params,"fishType",0,1).step(1).onChange(function(){
    createFish();
    //params.refresh=true;
  }

  );
  gui.add(params,"waterPollution").min(1).max(200).name("Water Purity");
  gui.add(params,"polluted");
  gui.add(params,"plastic");
  //gui.add(params,"dirt");
  gui.add(params,"chemical");

  //gui.add(params,"refresh");

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
