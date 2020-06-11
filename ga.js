var crossBirds = []
var saver = 0;
let bestScore = 0;
let bestBird = new Bird();


function nextGen(){


  fitness();
  let counter = 0;
  for (var i = 0; i < 100; i++){
    birds[i] = chooseOne(counter);
    counter++;
  }
  savedBirds = []
}


function chooseOne(counter){
  if (counter == 0){
    let max = 0;
    for (var i = 0; i < 2; i++){
      for (var j = 0; j < savedBirds.length; j++){
      // console.log(savedBirds[j].fitness);
        if(savedBirds[j].fitness > max){
          max = savedBirds[j].fitness
          saver = j;
        }
      }
      crossBirds[i] = savedBirds[saver];
      savedBirds.splice(saver, 1);
      if (i == 0){
        max = 0;
      }
    }
    console.log(crossBirds[0].score);
  }

  let child = new Bird(crossBirds[0].brain);
  const weights = crossBirds[1].brain.genomeGive();
  child.brain.crossover(weights);
  child.brain.mutate();
  return child;
}


function fitness(){
  let sum = 0;
  for (var i = 0; i < savedBirds.length; i++){
    sum += savedBirds[i].score;
  }

  for (var i = 0; i < savedBirds.length; i++){
    savedBirds[i].fitness = savedBirds[i].score/sum;
  }
}
