// ...existing code...
// Your variables go here

// a variable to store the video
let video;
// a variable to store the model 
let bodyPose;
// a variable to store the results
let poses = [];

// a variable to store the leds 
let leds = [];

function preload() {
    // Load ressources before setup

    // load the bodyPose model
    bodyPose = ml5.bodyPose();

    // load the arduino board
    loadBoard();
}
 
function setup() {
    // Code that runs once here
    createCanvas(500, 500).parent("sketch-container");

    // start capturing video
    video = createCapture(VIDEO);
    video.size(width, height);
    // hide the video element
    video.hide();

    // start the bodyPose detection
    bodyPose.detectStart(video, function(results){
        // make the results from the model globally accessible in the poses variable
        poses = results;
    });

    // create 5 led objects on pins 2..6
    leds = [
        new five.Led(5),
        new five.Led(6),
        new five.Led(9),
        new five.Led(10),
        new five.Led(11)
    ];
}

function draw() {
    // Code that runs repeatedly code here
    image(video, 0, 0);

    // draw 5 vertical zones and highlight the active one
    let zoneCount = 5;
    let zoneW = width / zoneCount;
    noStroke();

    // nothing: all off
    for(let i = 0; i < zoneCount; i++){
        fill(0, 0, 0, 0); 
        rect(i * zoneW, 0, zoneW, height);
    }

    if(poses.length > 0){
        
            let wrist = poses[0].right_wrist;

        if(wrist){
            // draw a circle on the wrist
            fill(255, 0, 0, 180);
            ellipse(wrist.x, wrist.y, 16, 16);

            // determine which zone the wrist is in
            let zoneIndex = Math.floor(constrain(wrist.x / zoneW, 0, zoneCount - 1));

            // rectangle the active zone
            fill(0, 255, 0, 60);
            rect(zoneIndex * zoneW, 0, zoneW, height);

            // switch LED, only the active one ON, others are OFF
            for(let i = 0; i < zoneCount; i++){
                if(i === zoneIndex){
                    leds[i].on();
                } else {
                    leds[i].off();
                }
            }
            return;
        }
    }
}