class Obstacle {

  constructor() {

    // Veichle geometri
    this.lw = 50;
    this.l_mc = 20;
    this.w_mc = 50;
    this.w = 100;

    // Veichle spawn position
    this.left = random(60, width/2-40);
    
    this.right = (width) - (this.left + random(120, 180) );
     //this.right = (width) - (this.left + random(120, 180) );
    //this.right =  random(width / 2+40, width - this.lw - 20);
    this.y1 = -height;
    this.y2 = -height+ random(-25,25);
    //this.kony = -height * 0.6;
    //this.konx = random(50, width - 50)

    this.score=0;

     
    //this.std=random(10,30)


    //Speed of driving incoming veichles..
    this.speed = 5;

    //Keep score
    this.highlight = false;

  }


// Collide controller!
  crash(car) {
    if ((car.y == this.y1 + this.w || car.y == this.y1 - this.w / 2 ||  car.y == this.y1 - this.w / 3 || car.y == this.y1 - this.w  ) || (car.y == this.y2 + this.w || car.y == this.y2 - this.w / 2 ||  car.y == this.y2 - this.w / 3 || car.y == this.y2 - this.w ) ){
      if ((car.x >= this.left - this.lw && car.x <= this.left + this.lw) || (car.x >= (width-this.right) - this.lw && car.x <= (width-this.right) + this.lw) ) {

        this.highlight = true;
        return true;
      }
    }
/*
   if (car.y == this.y2 + this.w || car.y == this.y2 - this.w / 2 ||  car.y == this.y2 - this.w / 3 || car.y == this.y2 - this.w ){
      if (car.x >= (width-this.right) - this.lw && car.x <= (width-this.right) + this.lw) {

        this.highlight = true;
        return true;
      }
    }
    */
   // if (car.y == this.kony + this.w_mc || car.y + this.w_mc == this.kony) {
    //  if (car.x >= this.konx - this.lw && car.x <= this.konx + this.l_mc) {

     //   this.highlight = true;
      //  return true;
    //  }
    //}

    return false;
  }

  show() {
    fill(255);

// set collided cars to red...
   if (this.highlight) {
      fill(255, 0, 0);

    }

    // generate rectangules as cars
    rect(this.left, this.y1, this.lw, this.w);
    rect(width-this.right, this.y2, this.lw, this.w);
   // rect(this.konx, this.kony, this.l_mc, this.w_mc);

  }

  update() {
    this.y1 += this.speed
    this.y2 += this.speed
    //this.kony += this.speed;
    //+this.y*0.007;
    //console.log(this.y);
  
  }

  //if cars are offscreen remove them from memomry (array)
  offscreen() {
    if (this.y1 > height + this.w || this.y2 > height + this.w ) {
      return true;
    } else {
      return false;
    }
   // if (this.kony > height + this.w_mc) {
    //  return true;
    //} else {
     // return false;
   // }
  }
}