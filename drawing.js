const BACKGROUND_COLOUR = '#000000';
const LINE_COLOUR = '#FFFFFF';
const LINE_WIDTH = 15;

let currentX = 0;
let currentY = 0;
let previousX = 0;
let previousY = 0;

const prepareCanvas = () => {
    const canvas = document.getElementById('my-canvas');
    const context = canvas.getContext('2d');

    context.fillStyle = BACKGROUND_COLOUR;
    context.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);

    context.strokeStyle = LINE_COLOUR;
    context.lineWidth = LINE_WIDTH;
    context.lineJoin = 'round';

    let isPainting = false;


    document.addEventListener('mousedown', (event) => {
        isPainting = true;
        currentX = event.clientX - canvas.offsetLeft;
        currentY = event.clientY - canvas.offsetTop;

    });

    document.addEventListener('mousemove', (event) => {

        if (isPainting) {
            previousX = currentX;
            currentX = event.clientX - canvas.offsetLeft;

            previousY = currentY;
            currentY = event.clientY - canvas.offsetTop;

            draw(context);
        }


    });

    document.addEventListener('mouseup', () => {
        isPainting = false;

    });

    canvas.addEventListener('mouseleave', () => {
        isPainting = false;

    });

    // Touch Events
    canvas.addEventListener('touchstart', (event) => {
        // console.log('Touchdown!');
        isPainting = true;
        currentX = event.touches[0].clientX - canvas.offsetLeft;
        currentY = event.touches[0].clientY - canvas.offsetTop;

    });

    canvas.addEventListener('touchend', () => {
        isPainting = false;

    });

    canvas.addEventListener('touchcancel', () => {
        isPainting = false;

    });

    canvas.addEventListener('touchmove', (event) => {

        if (isPainting) {
            previousX = currentX;
            currentX = event.touches[0].clientX - canvas.offsetLeft;

            previousY = currentY;
            currentY = event.touches[0].clientY - canvas.offsetTop;

            draw(context);
        }


    });

    return {canvas, context};

};

const draw = (context) => {
    context.beginPath();
    context.moveTo(previousX, previousY);
    context.lineTo(currentX, currentY);
    context.closePath();
    context.stroke();
};

const clearCanvas = (canvasNContext) => {
    currentX = 0;
    currentY = 0;
    previousX = 0;
    previousY = 0;
    canvasNContext.context.fillRect(0, 0, canvasNContext.canvas.clientWidth, canvasNContext.canvas.clientHeight);

};
