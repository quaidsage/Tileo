import { Sand, Water, Fire, Smoke, Wood, Stone, Custom, Empty } from './elements/ElementIndex.js';
import { gridWidth, col, row, grid } from './renderer.js';
import { updateHTMLValues } from './editor.js';

let brushSpeed = 10;
let brushSize = 4;
let brushInterval;
let currentElement = new Sand();
let mouseX, mouseY;

export function setupControls() {
    let canvas = document.getElementById('canvas');

    document.getElementById('reset').addEventListener('click', function () {
        grid.reset();
    });

    document.getElementById('fillgrid').addEventListener('click', function () {
        grid.fill();
    });

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
        let button = document.getElementById(controlId);
        button.addEventListener('click', function () {
            Object.keys(controls).forEach(id => {
                document.getElementById(id).classList.remove('button-selected');
            });
            button.classList.add('button-selected');

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

    let storedElement = localStorage.getItem('currentElement') || 'sand';
    currentElement = controls[storedElement]();
    document.getElementById('selected').textContent = `Selected: ${storedElement.charAt(0).toUpperCase() + storedElement.slice(1)}`;
    document.getElementById(storedElement).classList.add('button-selected');
    updateHTMLValues();

    let storedBrushSize = localStorage.getItem('brushSize') || 4;
    brushSize = parseInt(storedBrushSize);
    document.getElementById('brush').textContent = `Brush Size: ${brushSize + 1}`;
}

export { currentElement, brushSize, mouseX, mouseY }

