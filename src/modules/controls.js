import Sand from './elements/sand.js';
import Wood from './elements/wood.js';
import Water from './elements/water.js';
import Empty from './elements/empty.js';
import { brushSize, gridWidth, col, row, grid } from './renderer.js';

let brushSpeed = 10;
let brushInterval;
let currentElement = new Sand();
let mouseX, mouseY;


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

    document.getElementById('sand').addEventListener('click', function () {
        currentElement = new Sand();
        document.getElementById('selected').textContent = 'Selected: Sand'
    });

    document.getElementById('wood').addEventListener('click', function () {
        currentElement = new Wood();
        document.getElementById('selected').textContent = 'Selected: Wood';
    });

    document.getElementById('water').addEventListener('click', function () {
        currentElement = new Water();
        document.getElementById('selected').textContent = 'Selected: Water'
    });

    document.getElementById('plusbrush').addEventListener('click', function () {
        brushSize++;
        document.getElementById('brush').textContent = 'Brush Size: ' + brushSize;
    });

    document.getElementById('minusbrush').addEventListener('click', function () {
        brushSize--;
        document.getElementById('brush').textContent = 'Brush Size: ' + brushSize;
    });
}

export { currentElement, mouseX, mouseY }

