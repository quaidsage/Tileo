import Grid from './grid.js';
import { setupControls } from './controls.js';
import { setupEditor } from './editor.js';
import { DEBUG_MOVEMENT, DEBUG_VELOCITY, DEBUG_LIFE, RENDER_DELAY, setupConfig } from './config.js';
var canvas = document.getElementById("canvas");
var ctx = canvas === null || canvas === void 0 ? void 0 : canvas.getContext("2d");
var w = canvas.width;
var h = canvas.height;
var gridWidth = 80;
var gridSizing = [2, 5, 10, 20, 40, 80, 160];
var row = h / gridWidth;
var col = w / gridWidth;
var grid = new Grid();
var updateOnNextFrame = new Set();
var lastFrameTime = performance.now();
var frameTimes = [];
var maxFrameRate = 0;
export function increaseSize() {
    gridWidth = gridSizing[gridSizing.indexOf(gridWidth) + 1] || gridWidth;
    row = h / gridWidth;
    col = w / gridWidth;
    grid = new Grid();
    grid.initialize(row, col);
}
export function decreaseSize() {
    gridWidth = gridSizing[gridSizing.indexOf(gridWidth) - 1] || gridWidth;
    row = h / gridWidth;
    col = w / gridWidth;
    grid = new Grid();
    grid.initialize(row, col);
}
export function setGridSize(gridSize) {
    gridWidth = gridSize;
    row = h / gridWidth;
    col = w / gridWidth;
    grid = new Grid();
    grid.initialize(row, col);
}
export function start() {
    grid.initialize(row, col);
    setupControls();
    setupConfig();
    setupEditor();
    render();
}
export function drawPixel(index, element) {
    var colorList = element.color;
    if (DEBUG_MOVEMENT || DEBUG_VELOCITY || DEBUG_LIFE) {
        colorList = element.debugColor;
    }
    ctx.fillStyle = "rgb(".concat(colorList[0], ", ").concat(colorList[1], ", ").concat(colorList[2], ")");
    ctx.fillRect((index % col) * gridWidth, Math.floor(index / col) * gridWidth, gridWidth, gridWidth);
}
function calculateFrameRate() {
    var now = performance.now();
    var frameTime = now - lastFrameTime;
    lastFrameTime = now;
    // Keep the last 100 frame times
    if (frameTimes.length > 100) {
        frameTimes.shift();
    }
    frameTimes.push(frameTime);
    // Calculate the average frame time and convert to fps
    var averageFrameTime = frameTimes.reduce(function (a, b) { return a + b; }) / frameTimes.length;
    var frameRate = 1000 / averageFrameTime;
    // Update the frame rate display
    var frameRateElement = document.getElementById('frameRate');
    var maxFrameRateElement = document.getElementById('frameRateMax');
    frameRateElement.textContent = "Avg Frame Rate: ".concat(Math.round(frameRate), " fps");
    if (maxFrameRate < frameRate) {
        maxFrameRate = frameRate;
        maxFrameRateElement.textContent = "Max Frame Rate: ".concat(Math.round(maxFrameRate), " fps");
    }
}
function render() {
    grid.draw();
    calculateFrameRate();
    setTimeout(function () {
        requestAnimationFrame(function () { return render(); });
        updateOnNextFrame.clear();
    }, RENDER_DELAY);
}
export { gridWidth, col, row, ctx, grid, updateOnNextFrame };
