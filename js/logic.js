function move(fish,food,po){



  //fish.threegroup.position.set(pos.x,pos.y,pos.z);
  //fish.threegroup.position.x+=20;


  //eat(fish,food[0]);
  for(var i=0;i<food.length;i++){
    console.log(0);
  };

  //console.log("fish");
  //
  //console.log(food[0].position);


}
function create_food(){
  var m=mesh_food.clone()

  //pos.x=Math.round(pos.x);
  m.position.set(Math.random/window.innerLength,Math.random/window.innerWidth,10);

  food.push(m);
  //m.rotation.x += 0.005;
  //m.rotation.y += 0.01;

  scene.add(m);

  render();
}
function check_food(){

  //for(var i=0;i<food.length;i++){
    //create_food();
    food_part=food[0];

    eat(fish,food[0]);


  //};

}


function eat(fish,food_p){

    //fish.translateX(food_p.position.x);
    //console.log(food_p.position.x!=fish.threegroup.position.x)
    if (typeof(food_p) != "undefined"){

    if(

        Math.abs(food_p.position.x-fish.threegroup.position.x)>step |
        Math.abs(food_p.position.y-fish.threegroup.position.y)>step
        //&& Math.abs(food_p.position.z-fish.threegroup.position.z)>step


    ){
      //
      //console.log(food_p.position);
      //console.log(fish.threegroup.position);
        //animate();
        //var x,y,z=0;
        //fish.threegroup.lookAt(food_p.position);
        //fish.up.set(0,1,0);
        //fish.rotation.set(0,0,0);
        //console.log(fish.quaternion);
        //fish.lookAt(food_p.position.x,food_p.position.y,10)


        if (food_p.position.x>fish.threegroup.position.x){
          fish.threegroup.position.x+=step*velocity;
        }
        else{
          fish.threegroup.position.x-=step*velocity;
        };



        if (food_p.position.y>fish.threegroup.position.y){
          fish.threegroup.position.y+=step*velocity;
        }
        else{
          fish.threegroup.position.y-=step*velocity;
        };

        //animate();
        //console.log(Math.abs(food_p.position.x-fish.threegroup.position.x)>step);
        //console.log(Math.abs(food_p.position.y-fish.threegroup.position.y)>step);
        //console.log(Math.abs(food_p.position.z-fish.threegroup.position.z)>step);
        //requestAnimationFrame(animate);
      }else{
        scene.remove(food[0]);
        food.splice(0,1);
      }}





};


function calculate_rotation(p1,p2){
    return  Math.atan2(p2.y - p1.y, p2.x - p1.x)* 180 / Math.PI;


}


function onDocumentMouseClick(event) {
          //event.preventDefault();
          //console.log("click")
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



      function clamp(v,min, max){
        return Math.min(Math.max(v, min), max);
      }

      function rule3(v,vmin,vmax,tmin, tmax){
        var nv = Math.max(Math.min(v,vmax), vmin);
        var dv = vmax-vmin;
        var pc = (nv-vmin)/dv;
        var dt = tmax-tmin;
        var tv = tmin + (pc*dt);
        return tv;

      }
