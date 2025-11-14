// Your variables go here

let video;
let bodyPose;
let poses = [];

// a variable to store the RGB
let rgb;

// game state
let canMove = true; // green = can move, red = stop
let lastX = 0;   // last saved position 
let lastY = 0;  // last saved position
// timer for random light change
let nextChangeTime = 0;
let time = 0;


function preload() {

    // load the bodyPose model
    bodyPose = ml5.bodyPose();

    // load the arduino board
    loadBoard();
}

function setup() {
    createCanvas(500, 500).parent("sketch-container");

    // start camera
    video = createCapture(VIDEO);
    video.size(width, height);
    video.hide();

    // start pose detection
    bodyPose.detectStart(video, function(results){
        poses = results;
    });

    // RGB LED on pins 9 (R), 10 (G), 11 (B)
    rgb = new five.Led.RGB([9, 10, 11]);

    // start green
    setGreenLight();

    // set first random change time
    nextChangeTime + random(2000, 4000);


}

function draw() {
    image(video, 0, 0);
    time = millis();

    // change light randomly
    if (time > nextChangeTime) {
        toggleLight();
        nextChangeTime = nextChangeTime + random(2000, 4000);
    }

    // check movement only when red
    if(poses.length > 0){

        // on recupère position du nez actuelle
        let p = poses[0].nose;

        if(canMove == false){
             // on compare avec la position sauvegardée avec la distance
            let d = dist(p.x, p.y, lastX, lastY);
            if (d > 2){
                showRedOverlay();
            }
        }
       
        // on sauvegarde position actuelle dans la postion d'avant
        lastX = p.x;
        lastY = p.y;
        
    }

        console.log(`time check -> ${time} > ${nextChangeTime}`);

}



function toggleLight() {
    if (canMove) {
        setRedLight();
    } else {
        setGreenLight();
    }
}

function setGreenLight() {
    canMove = true;
    rgb.color("#00FF00"); // green
}

function setRedLight() {
    canMove = false;
    rgb.color("#FF0000"); // red
    savePosition();
}

function savePosition() {
    if (poses.length > 0){
        let p = poses[0].nose;
        lastX = p.x;
        lastY = p.y;
        
    
    }
}   

function showRedOverlay() {
    fill(255, 0, 0, 120);
    rect(0, 0, width, height);
} 