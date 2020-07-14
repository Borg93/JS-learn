
//Spawn cars..
function nextGeneration() {
  calculateFitness();

for (let i = 0; i < Population; i++) {
    cars[i] = pickOne();
  }
 for (let i = 0; i < Population; i++) {
    savedCars[i].dispose();
  }
  savedCars = [];
}

// Here we subtract probabilities until we get less than zero
// --> Higher probabilities will be more likely to be fixed, since they will
// subtract a larger number towards zero

function pickOne() {
  let index = 0;
  let r = random(1);

  let index2 = 0;
  let r2 = random(1);

  while (r > 0) {
    r = r - savedCars[index].fitness;
    index++;
  }
  index--;

   while (r2 > 0) {
    r2 = r2 - savedCars[index2].fitness;
    index2++;
  }
  index2--;

  let car = savedCars[index];
  let child = new Car(car.brain);

  let car2 = savedCars[index2];
  let childB = new Car(car2.brain);

 let aCopy = child.brain.copy();
 let bCopy = childB.brain.copy();

 child.crossOver(aCopy, bCopy);

 aCopy.model.dispose();
 bCopy.model.dispose();

 child.mutate();

  return child;
}

   
//calculate a normalized fitness value
function calculateFitness() {

  let sum = 0;
  
  // Make score exponentially better --> Ramps evole
    for (let car of savedCars) {
   car.score = pow(car.score, 4);
  }
  
  for (let car of savedCars) {
    sum += car.score;
     //console.log("ga score " +sum);

  }

  for (car of savedCars) {
    car.fitness += (car.score) / sum;
  }
}
