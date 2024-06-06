import { Sand, Water, Fire, Smoke, Wood, Stone, Custom, Empty } from './elements/ElementIndex.js';
import { gridWidth, col, row, grid, increaseSize, decreaseSize, setGridSize } from './renderer.js';
import { updateHTMLValues } from './editor.js';

let brushSpeed = 10;
let brushSize = 4;
let brushInterval;
let currentElement = new Sand();
let mouseX, mouseY;
let RENDER_DELAY = 20;


export function setupControls() {
    let canvas = document.getElementById('canvas');

    canvas.addEventListener('mousedown', function (e) {
        let rect = canvas.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;

        brushInterval = setInterval(() => {
            let i = Math.floor(mouseX / gridWidth);
            let j = Math.floor(mouseY / gridWidth);
            if (i >= 0 && i < col && j >= 0 && j < row) {
                grid.setBrush(i, j, currentElement);
            }
        }, brushSpeed);
    });

    canvas.addEventListener('mouseup', function () {
        clearInterval(brushInterval);
    });

    canvas.addEventListener('mousemove', function (e) {
        let rect = canvas.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;

        // Calculate the grid position of the mouse
        let i = Math.floor(mouseX / gridWidth);
        let j = Math.floor(mouseY / gridWidth);

        if (i >= 0 && i < col && j >= 0 && j < row) {
            document.getElementById('mousePosition').textContent = `Mouse position: ${i}, ${j}`;
        }
    });

    canvas.addEventListener('mouseleave', function () {
        clearInterval(brushInterval);
    });

    document.getElementById('reset').addEventListener('click', function () {
        grid.reset();
    });

    const controls = {
        'sand': () => new Sand(),
        'wood': () => new Wood(),
        'water': () => new Water(),
        'smoke': () => new Smoke(),
        'stone': () => new Stone(),
        'fire': () => new Fire(),
        'custom': () => new Custom(),
        'eraser': () => new Empty(),
    };

    Object.keys(controls).forEach(controlId => {
        document.getElementById(controlId).addEventListener('click', function () {
            currentElement = controls[controlId]();
            localStorage.setItem('currentElement', controlId);
            document.getElementById('selected').textContent = `Selected: ${controlId.charAt(0).toUpperCase() + controlId.slice(1)}`;
            updateHTMLValues();
        });
    });

    const brushControls = {
        'plusbrush': () => brushSize++,
        'minusbrush': () => brushSize = Math.max(0, brushSize - 1),
    };

    Object.keys(brushControls).forEach(controlId => {
        document.getElementById(controlId).addEventListener('click', function () {
            brushControls[controlId]();
            localStorage.setItem('brushSize', brushSize);
            document.getElementById('brush').textContent = `Brush Size: ${brushSize + 1}`;
        });
    });

    const gridControls = {
        'plusgrid': () => increaseSize(),
        'minusgrid': () => decreaseSize(),
    };

    Object.keys(gridControls).forEach(controlId => {
        document.getElementById(controlId).addEventListener('click', function () {
            gridControls[controlId]();
            localStorage.setItem('gridSize', gridWidth);
        });
    });

    document.getElementById('renderDelay').addEventListener('input', (event) => {
        localStorage.setItem('RENDER_DELAY', event.target.value);
        RENDER_DELAY = event.target.value;
    });

    let storedElement = localStorage.getItem('currentElement') || 'sand';
    currentElement = controls[storedElement]();
    document.getElementById('selected').textContent = `Selected: ${storedElement.charAt(0).toUpperCase() + storedElement.slice(1)}`;
    updateHTMLValues();

    let storedBrushSize = localStorage.getItem('brushSize') || 4;
    brushSize = parseInt(storedBrushSize);
    document.getElementById('brush').textContent = `Brush Size: ${brushSize + 1}`;

    let storedRenderDelay = localStorage.getItem('RENDER_DELAY') || 20;
    RENDER_DELAY = parseInt(storedRenderDelay);
    document.getElementById('renderDelay').value = RENDER_DELAY;

    let storedGridSize = localStorage.getItem('gridSize') || 8;
    setGridSize(parseInt(storedGridSize));
}

export { currentElement, brushSize, mouseX, mouseY, RENDER_DELAY }

