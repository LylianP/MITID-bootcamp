// Your variables go here

// a variable to store the video
let video;
// a variable to store the model 
let bodyPose;
// a variable to store the results
let poses = [];

// a variable to store the led 
let cartServo;
let longArmServo;
let shortArmServo;

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
    cartServo = new five.Servo(3);
    longArmServo = new five.Servo(5);
    shortArmServo = new five.Servo(6);
}

function draw() {
// Code that runs repeatedly code here
// background (200);
image (video, 0, 0);
// make sure that we have at least on pose detected
if (poses.length > 0){
// cart servo control mapped on nose y
let nose = poses[0].nose.y;
let angleNose = map(nose, 0, 500, 40, 120);
cartServo.to (angleNose);
// get nose position
// from position to angle
// move servo
// long arm servo control mapped on left wrist y
let leftWristy = poses[0].left_wrist.y;
let angleLWristy = map(leftWristy, 0, 500, 0, 180); // from position to angle
longArmServo.to(angleLWristy);
// move servo
// short arm servo control mapped on right wrist y
let rightWristx = poses[0].right_wrist.y;
// get wrist position
let angleRWristx = map(rightWristx, 0, 500, 0, 180); // from position to angle
shortArmServo.to(angleRWristx);
// move servo
        }
    }


