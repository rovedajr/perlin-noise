var inc = 0.1
var scl = 10
var cols, rows

var fr

var zoff = 0

particles = []

var flowfield

function setup() {
  createCanvas(300, 300)
  cols = floor(width / scl)
  rows = floor(height / scl)
  fr = createP('')

  flowfield = new Array(cols * rows)

  for (let i = 0; i < 100; i++) {
    particles[i] = new Particle()
  }
  
  background(255)
}

function draw() {
var yoff = 0

for (let y = 0; y < rows; y++) {
  var xoff = 0
  for (let x = 0; x < cols; x++) {
    var index = (x + y * cols)
    var angle = noise(xoff, yoff, zoff) * TWO_PI * 4
    var v = p5.Vector.fromAngle(angle)
    v.setMag(0.5)
    flowfield[index] = v

    xoff += inc
    stroke(0,50)   
    }
    yoff += inc
    zoff += 0.0001
  }
    for (let i = 0; i < particles.length; i++) {
      
      particles[i].follow(flowfield )
      particles[i].update()
      particles[i].edges()
      particles[i].show()
      
    }

  fr.html(floor(frameRate()))
}