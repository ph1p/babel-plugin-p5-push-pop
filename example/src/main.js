function setup() {
  createCanvas(300, 300);
  background(60);

  translate(width / 3, height / 3);

  ellipse(0, 50, 33, 33);

  {
    strokeWeight(10);
    fill(204, 153, 0);
    ellipse(33, 50, 33, 33);

    {
      stroke(0, 102, 153);
      ellipse(66, 50, 33, 33);
    }
  }

  ellipse(100, 50, 33, 33);
}

function draw() {}
