import Grid from './grid.js';
import * as controls from './controls.js';

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let w = canvas.width;
let h = canvas.height;
let gridWidth = 8;
let row = h / gridWidth;
let col = w / gridWidth;
let grid = new Grid(row, col);

let lastFrameTime = performance.now();
let frameTimes = [];
let maxFrameRate = 0;

function calculateFrameRate() {
    const now = performance.now();
    const frameTime = now - lastFrameTime;
    lastFrameTime = now;

    // Keep the last 100 frame times
    if (frameTimes.length > 100) {
        frameTimes.shift();
    }
    frameTimes.push(frameTime);

    // Calculate the average frame time and convert to fps
    const averageFrameTime = frameTimes.reduce((a, b) => a + b) / frameTimes.length;
    const frameRate = 1000 / averageFrameTime;

    // Update the frame rate display
    const frameRateElement = document.getElementById('frameRate');
    frameRateElement.textContent = `Avg Frame Rate: ${Math.round(frameRate)} fps`;
    if (maxFrameRate < frameRate) {
        maxFrameRate = frameRate;
        document.getElementById('frameRateMax').textContent = `Max Frame Rate: ${Math.round(maxFrameRate)} fps`;
    }
}

function drawPixel(index, element) {
    ctx.fillStyle = `rgb(${element.color[0]}, ${element.color[1]}, ${element.color[2]})`;
    ctx.fillRect((index % col) * gridWidth, Math.floor(index / col) * gridWidth, gridWidth, gridWidth);
}


function render() {
    grid.draw();
    calculateFrameRate();
    setTimeout(() => {
        requestAnimationFrame(() => render());
    }, controls.RENDER_DELAY);

}

export function start() {
    grid.initialize(row, col);
    controls.setupControls();
    render();
}

export { drawPixel, gridWidth, col, row, ctx, grid };
