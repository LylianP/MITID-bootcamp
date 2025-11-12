// Your variables go here

let synth; 

function preload() {
    // Load ressources before setup
}

function setup() {
    // Code that runs once here
    createCanvas(500, 500).parent("sketch-container");
    // new synth
    synth = new p5.MonoSynth();
    
    
}

function draw() {
    // Code that runs repeatedly code here
    // background(200);
    synth.play(mouseX, 0.5, 0, 0.2);
    line( mouseX, mouseY, pmouseX, pmouseY);
    quad(pmouseX, pmouseY, 86, 50, 50, 38, 14, 50);
}

function mousePressed() {
let red = random(0,255);
let green = random(0,255);
let blue = random(0,255);

    fill(red,green,blue);
    
    // play a note
    synth.play(300, 0.5, 0, 0.2);
}