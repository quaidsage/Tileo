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
let sqrW = 10;
let row = h / sqrW;
let col = w / sqrW;
let brushSize = 3;
let countl = 0;
let countr = 0;
let grid = new Grid(row, col);

function drawPixel(index, element) {
    if (element.empty) {
        ctx.fillStyle = `rgb(${Empty.baseColor[0]}, ${Empty.baseColor[1]}, ${Empty.baseColor[2]})`;
    } else {
        ctx.fillStyle = `rgb(${element.color[0]}, ${element.color[1]}, ${element.color[2]})`;
    }
    ctx.fillRect((index % col) * sqrW, Math.floor(index / col) * sqrW, sqrW, sqrW);
}

function render() {
    grid.draw();
    requestAnimationFrame(() => render());
}

export function start() {
    grid.initialize(row,col);
    controls.setupControls();
    render();
}

export {drawPixel, brushSize, sqrW, col, row, ctx, grid};
