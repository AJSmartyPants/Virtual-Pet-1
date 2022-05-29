//Create variables here
var dog, dogimg, happyDog, database, foodS, foodStock;
function preload()
{
	//load images here
  dogimg = loadImage('images/dogImg.png');
  happyDog = loadImage('images/dogImg1.png');
}

function setup() {
	createCanvas(500, 500);
  database = firebase.database();
  dog = createSprite(250,300);
  dog.scale = 0.15;
  dog.addImage(dogimg);

  foodStock = database.ref('Food');
  foodStock.on('value', readStock);
}


function draw() {  
  background(46, 139, 87);
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog)
  }
  drawSprites();
  //add styles here
  fill(255,255,254);
  text("Food Remaining: " + foodS, 170, 200);

}

function readStock(data) {
  foodS = data.val();
}

function writeStock(x){
  if(x<=0){
    x = 0;
  }else{
    x = x-1;
  }
  database.ref('/').update({
    Food: x
  })
}


