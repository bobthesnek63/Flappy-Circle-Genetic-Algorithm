var birds = [];
var savedBirds = []
var pipes = [];

function setup() {
  createCanvas(900, 800)

  tf.setBackend('cpu');

  for (var i = 0; i < 100; i++){
    birds.push(new Bird());
  }

  for (var i = 0; i < 3; i++){
    pipes.push(new Pipe(400 + (400 * i)))
  }
}

var generations = 0

function draw() {
  // put drawing code here
  background(0)

  if (birds.length === 0){
    console.log(generations);
    nextGen();
    pipes[0].reset();
    generations++;
  }

  for (var i = 0; i < birds.length; i++){
    birds[i].show();
    birds[i].think(birds[i].y, abs(pipes[0].y - birds[i].y), (pipes[0].y + 200 - birds[i].y), pipes[0].x - birds[i].x);
    birds[i].gravity();
    birds[i].hit(pipes[0].x, pipes[0].y, i);
  }

  for (var i = 0; i < pipes.length; i++){
    pipes[i].show();
    pipes[i].move();
  }
}
