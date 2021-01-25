//Create variables here
var dog, happyDog, dogImg, happyDogImg, database, foodS, foodStock;
var feed, addFood
var fedTime, lastFed
var foodObj

function preload()
{
  //load images here
  dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/dogImg1.png");
}

function setup() {
  database = firebase.database();
  createCanvas(900, 500);
  
  dog = createSprite(250,250,25,25);
  dog.addImage(dogImg);
  dog.scale=0.1

  foodStock=database.ref('food');
  foodStock.on("value",readStock);

  fedTime=database.ref('FoodTime');
  fedTime.on("value",function(data){
    lastFed = data.val();
  });

  foodObj = new Food(foodS,lastFed);

  feed=createButton("Feed The Dog")
  feed.position(650,95);
  feed.mousePressed(feedDog)

  addFood=createButton("Add More Food")
  addFood.position(800,95);
  addFood.mousePressed(addFoods)
}


function draw() {  
  background(rgb(10,50,50));
  foodObj.display();
  drawSprites();
  
  fill("white")
  text('Food Left is '+foodS,210,200)



fill("white");
textSize(25)
if(lastFed>=12){
  text("Last Feed : "+lastFed%12 + "PM", 350,30);

}else if(lastFed == 0){
  text("Last Feed : 12 AM",350,30);
}else{
  text("Last Feed : "+ lastFed + " AM", 350,30);
}

}


function readStock(data){
  foodS=data.val();
}

function writeStock(x){
  database.ref('/').update({
    food:x
  })
}

function feedDog(){
  dog.addImage(happyDogImg);
foodS=foodS-1;
database.ref('/').update({
  food: foodS,
FoodTime:hour()
})

}

function addFoods(){
  foodS++;
  database.ref('/').update({
    food: foodS
  })
}