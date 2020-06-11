class Bird {
  constructor(brain) {
    this.x = 100;
    this.y = 400;
    this.size = 50;
    this.results = 0;
    this.score = 0;
    this.fitness = 0;

    if (brain){
      this.brain = brain.copy();
    } else {
      this.brain = new Model();
    }
  }

  up(){
    this.y -= 75;
  }

  show(){
    ellipse(this.x, this.y, this.size, this.size);
  }

  gravity(){
    if (this.y >= 800){
      this.y = 800;
    } else if (this.y < 0){
      this.y = 0;
    } else {
      this.y += 5;
    }

    this.score++;
  }

  think(birdY, pipe1, pipe2, pipeD){
    this.results = this.brain.evaluate(birdY, pipe1, pipe2, pipeD);
    if (this.results > 0.5){
      this.up();
    }
  }

  hit(x, y, j){
    if (this.y < y || this.y > y + 150){
      if (this.x > x && this.x < x + 100){
        savedBirds.push(birds.splice(j, 1)[0]);
        // console.log(savedBirds[savedBirds.length - 1].score + ' score');
      }
    }
  }
}


// function Bird(brain){
//   this.x = 100;
//   this.y = 400;
//   this.size = 50;
//   this.model = new Model();
//   this.results = 0;
//   this.score = 0;
//   this.fitness = 0;
//
//   if (brain){
//     this.model = brain;
//   } else {
//     this.model = new Model();
//   }
//
//
//   this.up = function(){
//     this.y -= 75;
//   }
//
//   this.show = function(){
//     ellipse(this.x, this.y, this.size, this.size);
//   }
//
//   this.gravity = function(){
//     if (this.y >= 800){
//       this.y = 800;
//     } else if (this.y < 0){
//       this.y = 75;
//     } else {
//       this.y += 5;
//     }
//
//     this.score++;
//   }
//
//   this.think = function(birdY, pipe1, pipe2, pipeD){
//     this.results = this.model.evaluate(birdY, pipe1, pipe2, pipeD);
//
//     if (this.results > 0.5){
//       this.up();
//     }
//   }
//
//   this.hit = function(x, y, j){
//     if (x <= 100 && x + 100 >= 100 && this.y - 25 <= y){
//       // console.log(800 <= 100 <= 900 && 375 <= 386);
//       savedBirds.push(birds.splice(j, 1)[0]);
//     } else if (x <= 100 && x + 100 >= 100 && this.y + 50 >= y + 200){
//       savedBirds.push(birds.splice(j, 1)[0]);
//     }
//   }
// }
