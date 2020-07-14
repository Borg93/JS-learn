//Background movements
var bgImg;
var y1 = 0;
var y2;


// HTML variabels to show on DOM
var scrollSpeed = 1;
var highest_scores = 0;
var Cslider;
var counter = 0;
var generation_count=1;


//Variables for population of cars 
var Population = 500;
var cars = [];
var savedCars = [];
var obstacles = [];

//preload image
function preload() {
 try {
  bgImg = createImg('https://raw.githubusercontent.com/Borg93/JS-learn/master/roads3.png', 'roads3.png');
  //bgImg = loadImage("roads.png");
 	 } catch (err) {
   print("Can not load assets");
  	}
 }


//initalize setop for "game"
function setup() {
  // Running Tensorflow in background...
  tf.setBackend('cpu');

  createCanvas(400, 700);
  y2 = height;
  select('canvas').position(630, 50);
  
  
  //DOM elements
  Cslider = createSlider(1, 10 , 1).position(350, 440);
  high_score = select('#hscore');
  alltime_score = select('#all_time_hscore');
  generation_counts = select('#generation');

  //Spawn mulitple Cars
  for (let i = 0; i < Population; i++) {
    cars[i] = new Car();
  }
}

//Draw function is called every 100 framecount..
function draw() {
  for (let n=0; n< Cslider.value() ; n++) {
  
  //Spawn obstacles every frame
  if (counter % 100 == 0) {
    obstacles.push(new Obstacle());
  }
  counter++;

  // Store obstacles
  for (let i = obstacles.length - 1; i >= 0; i--) {
    obstacles[i].show();
    obstacles[i].update();

    // Indicate crash --> Remove cars
    for (let j = cars.length - 1; j >= 0; j--) {
      if (obstacles[i].crash(cars[j])) {
        savedCars.push(cars.splice(j, 1)[0]);
      }
    }


    //remove obstacles offscreen  
    if (obstacles[i].offscreen()) {
      obstacles.splice(i, 1);
    }
  }
    
   
    //remove cars offscreen
    for (let i = cars.length - 1; i >= 0; i--) {
      if (cars[i].offScreen()) {
        savedCars.push(cars.splice(i, 1)[0]);
      }
    }


  //
  for (let car of cars) {
    car.think(obstacles);
    car.update();
  }

// Call next generation when cars dies
  if (cars.length === 0) {
    counter = 0
    nextGeneration();
    generation_count++;
    generation_counts.html(generation_count);
    obstacles = [];
  }

}

  //Draw stuff
 // background(0)
image(bgImg, 0, y1, width, height);
image(bgImg, 0, y2, width, height);

  y1 += scrollSpeed*Cslider.value();
  y2 += scrollSpeed*Cslider.value();

  if (y1 > height) {
    y1 = -height;
  }
  if (y2 > height) {
    y2 = -height;
  }

  for (let car of cars) {
    car.show();
  }

  for (let obstacle of obstacles) {
    obstacle.show();
  }

  // Score stuff
let temp_highScore = 0;
let temp_bestcar = null;
  
for (let i = 0; i < cars.length; i++) {
      let scoring = cars[i].score;
      if (scoring > temp_highScore) {
        temp_highScore = scoring;
        temp_bestcar = cars[i]
      }
    }
  
   // Update DOM Elements
  if (temp_highScore > highest_scores) {
      highest_scores = temp_highScore;
    }
  
  high_score.html(temp_highScore);
  alltime_score.html(highest_scores);
 
}


/*Keylistener
function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    car.turnLeft();    
  }
    if (keyCode === RIGHT_ARROW) {
    car.turnRight(); 
  }
}*/
