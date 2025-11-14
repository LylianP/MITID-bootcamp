// Your variables go here

let video;
let bodyPose;
let poses = [];
// variables to store right wrist position
let pts = [];


let rightWristX = null;
let rightWristY = null;
let prevX = null;
let prevY = null;

let clearButton;


let button;
/*board.on("ready", function() {
    button.on("hold", function() {
        console.log( "Button held" );
        pts = []
    })
})
    */

function preload() {
    // Load the BodyPose model
    bodyPose = ml5.bodyPose();
    loadBoard();
}


function setup() {
    createCanvas(600, 500).parent("sketch-container");
    background(255); // white canvas


    video = createCapture(VIDEO);
    video.size(width, height);
    video.hide();

    // Start pose detection
    bodyPose.detectStart(video, function(results){
        poses = results;
    });

    // Create a button to clear the canvas
    clearButton = createButton("Clear Canvas");
    clearButton.parent("sketch-container");
    clearButton.mousePressed(() => pts = []);

    button = new five.Button({pin: 3, isPullup: true});
    button.on("press", function() {
        console.log( "Button pressed" );
        pts = []
    })

    noStroke()
}

function draw() {
    //background(255); // white canvas
    image(video, 0, 0, width, height);

    if(poses.length > 0){
        //console.log(poses);
        // get right wrist position
        let rightWrist = poses[0].right_wrist;
        pts.push({x: rightWrist.x, y: rightWrist.y});
    }
        
        
    
    for(let i of pts) {
        fill(255, 0, 0);
        ellipse(i.x, i.y, 20, 20);
    }
}

