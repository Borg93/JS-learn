class Car {

  constructor(brain) {
    //start postion for car
    this.y = 550;
    this.x = 175;

    //increments of moving car
    this.change = 1;
    this.move = 0;

    //Scoring
    this.score = 0;
    this.fitness = 0;

    //"Brain" which makes decison for car
    // Input layer = 6 --> car(1),obstacle(5), velocity(1),
    // Set hidden layer = 8
    //Output layer =2  --> left or right move
    if (brain) {
      this.brain = brain.copy();
    } else {
      this.brain = new NeuralNetwork(6, 4, 4 ,2);
    }
  }

  dispose() {
    this.brain.dispose();
  }



  think(obstacles) {

    // Find the closest obstacles
    let closest = null;
    let record = Number.NEGATIVE_INFINITY;
    for (let i = 0; i < obstacles.length; i++) {

    if (obstacles[i].y1 > obstacles[i].y2){
      let diff = (obstacles[i].y1 - obstacles[i].w)
     // console.log(diff)]
      if (diff > record && diff < height) {
        closest = obstacles[i];
        //console.log(closest);
        record = diff;
        //console.log(record);
      }
    }
    else if (obstacles[i].y2 > obstacles[i].y1){
      let diff = (obstacles[i].y2 - obstacles[i].w)
     // console.log(diff)]
      if (diff > record && diff < height) {
        closest = obstacles[i];
        //console.log(closest);
        record = diff;
        //console.log(record);
      }
    }
  }

    let inputs = [];

    inputs[0] = this.x / width; //car position

    // Cars obs
    inputs[1] = closest.left / width;
    inputs[2] = closest.right / width;
    inputs[3] = closest.y1 / height;
    inputs[4] = closest.y2 / height;
    inputs[5] = this.move / 10;

    
  // console.log(inputs[4]);
    // Mc Obs
    //inputs[4] = obstacles[0].konx / width
    //inputs[5] = obstacles[0].kony / height

    let output = this.brain.predict(inputs);

     if (output[0] > output[1] ){
      this.turnLeft();
    }
    else if (output[0] < output[1] ){
      this.turnRight();
    }


  }


  show() {
    //creation of car
    stroke(255);
    fill(255, 100);
    rect(this.x, this.y, 50, 100);
  }

  //left move
  turnLeft() {
   // if (this.x > 50) {
      this.move += -this.change;
      this.x += this.move;


    //}
    /* else {
          this.move = 0
          this.x = 25;


        }*/
  }

  //right move
  turnRight() {
   // if (this.x < 325) {
      this.move += this.change;
      this.x += this.move;

   // }
    /*else {
         this.move = 0;
         this.x = 325;

       }*/

  }

  mutate() {
    this.brain.mutate(0.05);
  }

    crossOver(a, b) {
    this.brain.crossOver(a, b);
  }



  update() {
    this.score++;
  }

  offScreen() {
    return this.x > width-50 || this.x < 0+50;
  }
}