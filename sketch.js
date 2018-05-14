
let r, g, b;

function pickColor(){
	r = random(255);
	b = random(255);
	g = random(255);
}

function setup(){
	createCanvas(640, 360);
}
function mousePressed(){
	pickColor();
}

function draw(){
	background(r, g, b);
}