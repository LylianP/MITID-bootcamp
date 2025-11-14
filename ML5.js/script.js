// Your variables go here
// store vid and body pose 
let video; 
let bodyPose;
//store the results
let poses =[];

function preload() {
    // Load ressources before setup
    bodyPose = ml5.bodyPose();
}

function setup() {
    // Code that runs once here
    createCanvas(500, 500).parent("sketch-container");

    video = createCapture (VIDEO);
    video.hide();
    bodyPose.detectStart (video,function(results){
        poses = results;
    })
}

function draw() {
    // Code that runs repeatedly code here
    background(200);
    image(video,0,0);
    if (poses.length >0){
        //target the nose
        let nose = poses [0].nose;
        console.log(nose);
        fill (255,0,0);
        circle (nose.x, nose.y,20);

        let head = poses [0].head;
        let distance0 = dist (nose.x, nose.y);
        console.log (distanceO);
        fill (255,255,255);
        stroke (0,0,0);
        strokeWeight (10);
        circle (head.x, head.y, distance);
    
        let lefteye = poses [0].leftEye;
        let righteye = poses [0].rightEye;
        let distance1 = dist(lefteye.x, lefteye.y, righteye.x, righteye.y);
        console.log (distance1); 
        nofill ();
        stroke (0,255,0);
        strokeWeight (10);
        rect (lefteye.x, lefteye.y, distance, righteye.x, righteye.y, distance);
        
        let lefthear = poses [0].leftEar;
        let righthear = poses [0].rightEar;
        let distance2 = dist (lefthear.x, lefthear.y, righthear.x, righthear.y);
        console.log (distance2);
        fill (255,255,255);
        stroke (0,0,0);
        strokeWeight (10);
        circle ((lefthear.x + righthear.x)/2, (lefthear.y + righthear.y)/2, distance);

        
        
    }
}

function mousePressed (){
    console.log(poses);
}