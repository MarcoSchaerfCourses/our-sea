function move(fish,food,po){



  //fish.position.set(pos.x,pos.y,pos.z);
  //fish.position.x+=20;


  //eat(fish,food[0]);
  for(var i=0;i<food.length;i++){
    console.log(0);
  };

  //console.log("fish");
  //
  //console.log(food[0].position);


}
function check_food(){

  //for(var i=0;i<food.length;i++){
    food_part=food[0];
    eat(fish,food[0]);


  //};

}


function eat(fish,food_p){

    //fish.translateX(food_p.position.x);
    //console.log(food_p.position.x!=fish.position.x)
    if (typeof(food_p) != "undefined"){

    if(

        Math.abs(food_p.position.x-fish.position.x)>step*velocity |
        Math.abs(food_p.position.y-fish.position.y)>step*velocity
        //&& Math.abs(food_p.position.z-fish.position.z)>step


    ){
      //console.log(food_p.position);
      //console.log(fish.position);
        //animate();
        //var x,y,z=0;
        fish.lookAt(food_p.position);
        //console.log(fish.quaternion);



        if (food_p.position.x>fish.position.x){
          fish.position.x+=step*velocity;
        }
        else{
          fish.position.x-=step*velocity;
        };



        if (food_p.position.y>fish.position.y){
          fish.position.y+=step*velocity;
        }
        else{
          fish.position.y-=step*velocity;
        };

        //animate();
        //console.log(Math.abs(food_p.position.x-fish.position.x)>step);
        //console.log(Math.abs(food_p.position.y-fish.position.y)>step);
        //console.log(Math.abs(food_p.position.z-fish.position.z)>step);
        //requestAnimationFrame(animate);
      }else{
        scene.remove(food[0]);
        food.splice(0,1);
      }}





};


function calculate_rotation(point1,point2){



}
