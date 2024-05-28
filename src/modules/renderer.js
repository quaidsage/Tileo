import Grid from './grid.js';
import * as controls from './controls.js';
import Empty from './elements/empty.js';
import Sand from './elements/sand.js';
import Wood from './elements/wood.js';
import Water from './elements/water.js';

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let w = canvas.width;
let h = canvas.height;
let gridWidth = 5;
let row = h / gridWidth;
let col = w / gridWidth;
let brushSize = 3;
let grid = new Grid(row, col);

function drawPixel(index, element) {
    if (element.empty) {
        ctx.fillStyle = `rgb(${Empty.baseColor[0]}, ${Empty.baseColor[1]}, ${Empty.baseColor[2]})`;
    } else {
        ctx.fillStyle = `rgb(${element.color[0]}, ${element.color[1]}, ${element.color[2]})`;
    }
    ctx.fillRect((index % col) * gridWidth, Math.floor(index / col) * gridWidth, gridWidth, gridWidth);
}

function render() {
    grid.draw();
    setTimeout(() => {
        requestAnimationFrame(() => render());
    }, 0); // Delay in milliseconds (e.g., 1000ms = 1 second)

}

export function start() {
    grid.initialize(row, col);
    controls.setupControls();
    render();
}

export { drawPixel, brushSize, gridWidth, col, row, ctx, grid };
