// SELECT THE ELEMENTS ON THE PAGE
// Canvas, shake button
const canvas = document.querySelector('#etch-a-sketch');
const ctx = canvas.getContext('2d'); 
const shakebutton = document.querySelector('.btn-shake');
const MOVE_AMOUNT = 20;

// SETUP OUR CANVAS FOR DRAWING
// Destructuring
const { width, height } = canvas;

console.log(width, height);

// Create random x and y starting points on the canvas
let x = Math.floor(Math.random() * width);
let y = Math.floor(Math.random() * height);

ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = MOVE_AMOUNT;

let hue = 0;
ctx.strokeStyle = `hsl(${Math.random() * 360}, 100%, 50%)`;

// start the drawing
ctx.beginPath();
ctx.moveTo(x, y);
ctx.lineTo(x, y);
ctx.stroke();

// DRAW FUNCTION
function draw({ key }) {
    // increment the hue
    hue += 10;
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    ctx.beginPath(); 
    ctx.moveTo(x, y);

    // move our x and y values depending on what the user did
    switch (key) {
        case 'ArrowUp':
            y -= MOVE_AMOUNT;
            break;
        case 'ArrowDown':
            y += MOVE_AMOUNT;
            break;
        case 'ArrowLeft':
            x -= MOVE_AMOUNT;
            break;
        case 'ArrowRight':
            x += MOVE_AMOUNT;
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
    canvas.classList.add('shake');
    ctx.clearRect(0, 0, width, height);
    canvas.addEventListener('animationend', function() {
        canvas.classList.remove('shake');
    }, { once: true});
}

// LISTEN FOR ARROW KEYS
window.addEventListener('keydown', handleKey);

// LISTEN FOR CLICK ON BUTTON
shakebutton.addEventListener('click', clearCanvas);
