import Grid from './grid.js';
import Element from './elements/element.js';
import { setupControls, updateCurrentTransform } from './controls.js';
import { DEBUG_MODE, DebugOptions, RENDER_DELAY, setupConfig } from './config.js';
import { closeCurrentMenu, setupToolbar } from './ui/toolbar.js';
import { toggleBrushMenu } from './ui/brush-menu.js';
import { toggleHelpMenu } from './ui/help-menu.js';

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = (canvas as HTMLCanvasElement | null)?.getContext("2d") as CanvasRenderingContext2D;

let w = canvas.width;
let h = canvas.height;
let gridWidth = 5;
let gridSizing = [2, 5, 10, 20, 40, 80, 160];
let row = h / gridWidth;
let col = w / gridWidth;
let grid = new Grid();
let updateOnNextFrame: Set<number> = new Set();
let currentTransform: DOMMatrix;

let lastFrameTime = performance.now();
let frameTimes: number[] = [];
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

export function setGridSize(gridSize: number) {
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
    setupToolbar();
    render();

    // If first time on the page, show the help menu
    if (localStorage.getItem('firstTime') === null) {
        localStorage.setItem('firstTime', 'false');
        toggleHelpMenu(true);
    }
}

export function drawPixel(index: number, element: Element) {
    let colorList = element.color;

    if (DEBUG_MODE !== DebugOptions.NONE) {
        colorList = element.debugColor;
    }
    ctx.fillStyle = `rgb(${colorList[0]}, ${colorList[1]}, ${colorList[2]})`;

    const x = Math.floor((index % col) * gridWidth);
    const y = Math.floor(index / col) * gridWidth;

    ctx.fillRect(x, y, gridWidth, gridWidth);
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

export function importGridSave(save: Grid) {
    grid = save;
}

export function focusCanvas() {
    closeCurrentMenu();
    toggleBrushMenu(false);
    canvas.focus();
}

export { gridWidth, col, row, ctx, grid, updateOnNextFrame, camera, currentTransform };
