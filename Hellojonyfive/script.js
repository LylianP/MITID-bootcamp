// Your variables go here
let led;
function preload() {
    // Load ressources before setup
    //we want to load the arduino board
    loadBoard();
}

function setup() {
    // Code that runs once here
    createCanvas(500, 500).parent("sketch-container");
    led = new five.Led(3);
    light =new five.Sensor (
    {
        pin: "A0",
        freq: 250,
        threshold: 5
    });
    light.on("change", function() {
        let newValue = this.scaleTo(0,255);
        background(newValue);
    });
}

function draw() {
    // Code that runs repeatedly code here
    // background(200);

    led.on();
    if(mouseX >= width / 2)
        led.brightness(150);{
    }if(mouseX >= width / 2 && mouseX <= 400){
        led.brightness(200);
    }else{
        led.brightness(255);
    }
}