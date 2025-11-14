// Your variables go here

// a variable to store the video
let video;
// a variable to store the model 
let bodyPose;
// a variable to store the results
let poses = [];

// a variable to store the led 
let servo;

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
    // hide the video element
    video.hide();

    // start the bodyPose detection
    bodyPose.detectStart(video, function(results){
        // make the results from the model globally accessible in the poses variable
        poses = results;
    });

    // create the led object on pin 3
    servo = new five.Servo(3);
}

function draw() {
    // Code that runs repeatedly code here
    // background(200);
    image(video, 0, 0);

    // make sure that we have at least on pose detected
    if(poses.length > 0){
        
        // create a variable to store the wrist pose
        let wrist = poses[0].right_wrist;
        let angle = map(wrist.x, 0, width, 0, 180);
        servo.to(angle);
        // check if the hand is on the left of the screen
        if(wrist.x < width/2){

            // switch on the led
            servo.to(0);
        } else {
            servo.to(180);
        }
    }
}