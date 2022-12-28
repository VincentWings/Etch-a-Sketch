// SELECT THE ELEMENTS ON THE PAGE
// Canvas element and shake button element
const canvas = document.querySelector('#etch-a-sketch');
const ctx = canvas.getContext('2d'); // Get the 2D context of the canvas element, which is used for drawing
const shakebutton = document.querySelector('.btn-shake'); // Select the element with the class 'btn-shake'
const MOVE_AMOUNT = 20; // A constant representing the amount to move the drawing on each key press

// SETUP OUR CANVAS FOR DRAWING
// Destructuring the width and height properties from the canvas element
const { width, height } = canvas;

// Create random x and y starting points on the canvas
let x = Math.floor(Math.random() * width);
let y = Math.floor(Math.random() * height);

// Set various canvas drawing properties
ctx.lineJoin = 'round'; // The shape that is used at the corners of paths when they are stroked
ctx.lineCap = 'round'; // The shape to be used at the end of open subpaths when they are stroked
ctx.lineWidth = MOVE_AMOUNT; // The width of lines in space units

let hue = 0; // A variable representing the current hue value for the stroke color
ctx.strokeStyle = `hsl(${Math.random() * 360}, 100%, 50%)`; // Set the stroke color to a random hue

// start the drawing
ctx.beginPath(); // Begins a new path
ctx.moveTo(x, y); // Move the starting point of the path to the specified point
ctx.lineTo(x, y); // Add a straight line to the path
ctx.stroke(); // Stroke the path

// DRAW FUNCTION
function draw({ key }) { // Object destructuring to get the 'key' property from the object passed as an argument
    // increment the hue
    hue += 10;
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`; // Set the stroke color to the current hue value
    ctx.beginPath(); // Begins a new path
    ctx.moveTo(x, y); // Move the starting point of the path to the current x and y position

    // Move our x and y values depending on what the user did
    switch (key) {
        case 'ArrowUp':
            y -= MOVE_AMOUNT; // move up
            break;
        case 'ArrowDown':
            y += MOVE_AMOUNT; // move down
            break;
        case 'ArrowLeft':
            x -= MOVE_AMOUNT; // move left
            break;
        case 'ArrowRight':
            x += MOVE_AMOUNT; // move right
            break; 
        default:
            break;
    }
    ctx.lineTo(x, y);
    ctx.stroke();
}

// HANDLER FOR THE KEY
function handleKey(e) { 
    if(e.key.includes('Arrow')) {
        draw({ key: e.key });
    }
}

// CLEAR / SHAKE FUNCTION
function clearCanvas() {
    canvas.classList.add('shake'); // adds the class 'shake' to the canvas element, which triggers the shake animation
    ctx.clearRect(0, 0, width, height); // clears the canvas
    canvas.addEventListener('animationend', function() { // adds an event listener for the 'animationend' event
        canvas.classList.remove('shake'); // removes the 'shake' class from the canvas element once the animation ends
    }, { once: true}); // the event listener is set to run only once
}

// LISTEN FOR ARROW KEYS
window.addEventListener('keydown', handleKey); // adds an event listener for the 'keydown' event on the window object, and calls the 'handleKey' function when the event is triggered

// LISTEN FOR CLICK ON BUTTON
shakebutton.addEventListener('click', clearCanvas); // adds an event listener for the 'click' event on the 'shakebutton' element, and calls the 'clearCanvas' function when the event is triggered
