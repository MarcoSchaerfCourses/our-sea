//THREEJS RELATED VARIABLES
//This work is based on the work of https://codepen.io/Yakudoo/pen/BNNGBq
//Everything is understood and edited to match the requirements from the project


var scene,
    camera,
    fieldOfView,
  	aspectRatio,
  	nearPlane,
  	farPlane,
    shadowLight,
    light,
    renderer,
		container,
    controls,
    gui,
    params;

//SCREEN VARIABLES
var HEIGHT,
  	WIDTH,
    windowHalfX,
  	windowHalfY,
    xLimit,
    yLimit;

// FISH BODY PARTS
var fish,
    bodyFish,
    tailFish,
    topFish,
    rightIris,
    leftIris,
    rightEye,
    leftEye,
    lipsFish,
    tooth1,
    tooth2,
    tooth3,
    tooth4,
    tooth5;

// FISH SPEED
// the colors are splitted into rgb values to facilitate the transition of the color
var fishFastColor = {r:255, g:0, b:224}; // pastel blue
		fishSlowColor = {r:0, g:207, b:255}; // purple
    angleFin = 0; // angle used to move the fishtail

// PARTICLES COLORS
// array used to store a color scheme to randomly tint the particles
var colors = ['#dff69e',
              '#00ceff',
              '#002bca',
              '#ff00e0',
              '#3f159f',
              '#71b583',
              '#00a2ff'];

// PARTICLES
// as the particles are recycled, I use 2 arrays to store them
// flyingParticles used to update the flying particles and waitingParticles used to store the "unused" particles until we need them;
var flyingParticles = [];
		waitingParticles = [];
// maximum z position for a particle
		maxParticlesZ = 600;

// SPEED
var speed = {x:0, y:0};
var smoothing = 10;

// MISC
var mousePos = {x:0, y:0};
var stats;
var halfPI = Math.PI/2;
var params={
  fishType: 0,
  refresh: false,
  debug: false,
  waterPollution: 70,
  polluted:false,
  plastic: false,
  //dirt: false,
  chemical: false,



}

// depending if there is particles stored in the waintingParticles array, get one from there or create a new one

init();
//if(params.debug){createStats();}
createStats();
createLight();


createFish();
createGUI();
createParticle();
loop();
var counter=10;
var myFunction = function() {
    counter *= 10;
    setTimeout(myFunction, counter);
}
setTimeout(flyParticle, params.waterPollution)
//setInterval(flyParticle, 10); // launch a new particle every 70ms
