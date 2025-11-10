# MITID-bootcamp
Welcome to the README for the Intermediate Bootcamp designed for M.I.T.i.d students.
This page gathers all the essential information you may need in case you forget something.
Before we begin, here is an overview of the technical components and tools we will be using throughout these three days.

![image of technic stack](assets/repo-stack.png)

### 🙋🏻‍♂️ Remind me what a library is

>In programming, a library is **a collection of pre-written code that provides specific tools or functions you can use in your own projects**. Instead of writing everything from scratch, you can use a library to handle tasks such as drawing graphics, working with sound, or managing user interactions—saving time and allowing you to focus on creativity and design.


## Table of content

- [How to use this repo](#how-to-use-this-repo)
- [P5.js reminders](#p5js)
- [Johnny five → J5.js](#johnny-five)
  * [Firmata](#firmata)
  * [Add johnny five to your P5.js sketch](#add-j5js-in-your-p5js-sketch)
  * [Components documentation](#johnny-five-documentation-for-almost-each-components-from-your-kit)
- [ML5.js](#)
  * [Add bodyPose to your P5.js sketch](#bodypose)


## How to use this repo

>[!CAUTION]
>For each new sketch you want to create, duplicate the `sketch` folder and rename your copy.

## P5.js

p5.js is a JavaScript library designed to make coding accessible for artists, designers, educators, and beginners. It provides an easy and creative way to draw shapes, create animations, and build interactive visuals directly in a web browser. Built on top of standard JavaScript, **p5.js simplifies complex coding concepts and focuses on visual and interactive design**.

>[!TIP]
>Have a look at the [P5.js library documentation↗](https://p5js.org/reference/)



## johnny five

jhonny-five documentation: https://johnny-five.io/api/

johnny five fonctionne en deux parties. On commence par téléverser Firmata sur la carte arduino uno. Cela va nous permettre de controler notre carte arduino depuis notre page web, grâce à javascript et plus spécifiquement la librarie johnny-five.

### Firmata 

Steps:
- Plug in your Arduino or Arduino compatible microcontroller via USB
- Open the Arduino IDE, select: `File > Examples > Firmata > StandardFirmataPlus`
StandardFirmataPlus is available in Firmata v2.5.0 or greater
- Select your board and port.
- Click the "Upload" button.

Keep in mind:
- You just need to upload firmata ONCE on your board.
- Leave the board plugged to your computer when you want to use it. 
- Make sure to unplug the board when you create a circuit.

### Add J5.js in your P5.js sketch

 minimal sketch to switch on a led

```javascript 

// a variable to store the "electronic object"
let led;

function preload(){

    // Load the board
    loadBoard();
}

function setup(){

    // we attach the led on the arduino pin ~3
    led = new five.Led(3);
}

function draw(){

    // switch on the led
    led.on();

    // switch off the led
    led.off();

    // set brightness from 0 to 255 (pin 3 has a ~ so we can apply an analog value)
    led.brightness(100);
}
```

More informations on leds can be found in the documentation 
https://johnny-five.io/api/led/

### johnny five documentation for (almost) each components from your kit

**OUTPUTS**
- [Led↗](https://johnny-five.io/api/led/)
- [RGB led↗](https://johnny-five.io/api/led.rgb/)
- [Piezo (buzzer)↗](https://johnny-five.io/api/piezo/)
- [Servo↗](https://johnny-five.io/api/servo/)
- [Motor↗](https://johnny-five.io/api/motor/)
- [LCD screen↗](https://johnny-five.io/api/lcd/) [ + show me example](https://editor.p5js.org/methio/sketches/5C3DsmEnI)
```javascript 
    // LCD controller
    lcd = new five.LCD({
        controller: "PCF8574T",
    });  
```
**INPUTS**
- [Button↗](https://johnny-five.io/api/button/)
- [Sensor (light sensor and potentiometer for instance)↗](https://johnny-five.io/api/sensor/)

Components available in the makers'lab
- [Joystick↗](https://johnny-five.io/api/joystick/)
- [Motion sensor↗](https://johnny-five.io/api/motion/)

## ML5.js

BodyPose documentation on ml5.js website : [https://docs.ml5js.org/#/reference/bodypose↗](https://docs.ml5js.org/#/reference/bodypose)

### BodyPose

```javascript 

    let video;        // variable to store webcam
    let bodyPose;     // variable to store bodyPose model
    let poses = [];   // variable to store poses the model sends us

    // Load the model
    function preload() {
        bodyPose = ml5.bodyPose();
    }

    function setup() {
        // 🙋🏻‍♂️ We need to have a canvas
        createCanvas(640, 480);
        frameRate(12); // 👨🏻‍🚒🚒 in case computer starts burning
        
        // Create the video and hide it
        video = createCapture(VIDEO);
        video.size(640, 480);
        video.hide();

        // Start detecting poses with the webcam video as an input, output can be found in poses array
        bodyPose.detectStart(video, results=>poses=results);
    }

    function draw(){
        // display video in the canvas
        image(video, 0, 0, width, height);        

        // check if at least one person is detected
        if(poses.length>0){

            // console.log what the model detects
            console.log(poses);
        }
    }
```

