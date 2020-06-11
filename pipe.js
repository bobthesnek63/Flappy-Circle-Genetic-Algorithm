function Pipe(n){
  this.x = n;
  this.y = Math.floor((Math.random()*600) + 1);

  this.show = function(){
    rect(this.x, 0, 100, this.y);
    rect(this.x, this.y + 150, 100, 800 - this.y + 150);
  }

  this.move = function(){
    if (this.x < 0){
      pipes.splice(0, 1);
      pipes.push(new Pipe(1200));
      this.y = Math.floor((Math.random()*600) + 1);
    } else{
      this.x -= 3;
    }
  }

  this.reset = function() {
    pipes = []
    for (var i = 0; i < 3; i++){
      pipes.push(new Pipe(400 + (400 * i)))
    }
  }
}
