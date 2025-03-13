import Grid from './grid.js';
import { setupControls, updateCurrentTransform } from './controls.js';
import { setupEditor } from './editor.js';
import { DEBUG_MOVEMENT, DEBUG_VELOCITY, DEBUG_LIFE, RENDER_DELAY, setupConfig } from './config.js';
import { setupToolbar } from './toolbar.js';
const canvas = document.getElementById("canvas");
const ctx = canvas === null || canvas === void 0 ? void 0 : canvas.getContext("2d");
let w = canvas.width;
let h = canvas.height;
let gridWidth = 80;
let gridSizing = [2, 5, 10, 20, 40, 80, 160];
let row = h / gridWidth;
let col = w / gridWidth;
let grid = new Grid();
let updateOnNextFrame = new Set();
let currentTransform;
let lastFrameTime = performance.now();
let frameTimes = [];
let maxFrameRate = 0;
let camera = {
    x: 0,
    y: 0,
    scale: 1,
    minScale: 0.5,
    maxScale: 5
};
let oldCameraScale = 0;
let oldCameraXPosition = 0;
let oldCameraYPosition = 0;
export function increaseSize() {
    gridWidth = gridSizing[gridSizing.indexOf(gridWidth) + 1] || gridWidth;
    row = Math.floor(h / gridWidth);
    col = Math.floor(w / gridWidth);
    grid = new Grid();
    grid.initialize(row, col);
}
export function decreaseSize() {
    gridWidth = gridSizing[gridSizing.indexOf(gridWidth) - 1] || gridWidth;
    row = Math.floor(h / gridWidth);
    col = Math.floor(w / gridWidth);
    grid = new Grid();
    grid.initialize(row, col);
}
export function setGridSize(gridSize) {
    gridWidth = gridSize;
    row = Math.floor(h / gridWidth);
    col = Math.floor(w / gridWidth);
    grid = new Grid();
    grid.initialize(row, col);
}
export function start() {
    canvas.width = Math.floor((document.documentElement.clientWidth * 1) / gridWidth) * gridWidth;
    w = canvas.width;
    canvas.height = Math.floor((document.documentElement.clientHeight * 1) / gridWidth) * gridWidth;
    h = canvas.height;
    row = Math.floor(h / gridWidth);
    col = Math.floor(w / gridWidth);
    grid.initialize(row, col);
    setupControls();
    setupConfig();
    setupEditor();
    setupToolbar();
    render();
}
export function drawPixel(index, element) {
    let colorList = element.color;
    if (DEBUG_MOVEMENT || DEBUG_VELOCITY || DEBUG_LIFE) {
        colorList = element.debugColor;
    }
    ctx.fillStyle = `rgb(${colorList[0]}, ${colorList[1]}, ${colorList[2]})`;
    ctx.fillRect((index % col) * gridWidth, Math.floor(index / col) * gridWidth, gridWidth, gridWidth);
}
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
    const maxFrameRateElement = document.getElementById('frameRateMax');
    frameRateElement.textContent = `Avg Frame Rate: ${Math.round(frameRate)} fps`;
    if (maxFrameRate < frameRate) {
        maxFrameRate = frameRate;
        maxFrameRateElement.textContent = `Max Frame Rate: ${Math.round(maxFrameRate)} fps`;
    }
}
function render() {
    let didCameraMove = oldCameraXPosition !== camera.x || oldCameraYPosition !== camera.y || oldCameraScale !== camera.scale;
    ctx.resetTransform();
    if (didCameraMove) {
        ctx.clearRect(0, 0, w, h);
    }
    ctx.save();
    ctx.translate(-camera.x, -camera.y);
    ctx.scale(camera.scale, camera.scale);
    updateCurrentTransform(ctx.getTransform());
    grid.draw();
    if (didCameraMove) {
        grid.drawAll();
        oldCameraScale = camera.scale;
        oldCameraXPosition = camera.x;
        oldCameraYPosition = camera.y;
    }
    ctx.restore();
    calculateFrameRate();
    setTimeout(() => {
        requestAnimationFrame(() => render());
        updateOnNextFrame.clear();
    }, RENDER_DELAY);
}
export { gridWidth, col, row, ctx, grid, updateOnNextFrame, camera, currentTransform };
