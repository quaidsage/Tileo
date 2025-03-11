import { Sand, Water, Fire, Smoke, Wood, Stone, Custom, Empty } from './elements/ElementIndex.js';
import { gridWidth, col, row, grid, camera, ctx } from './renderer.js';
import { updateHTMLValues } from './editor.js';
import Solid from './elements/solids/solid.js';
import Liquid from './elements/liquids/liquid.js';
import Gas from './elements/gases/gas.js';

let brushSpeed = 10;
let brushSize = 4;
let brushInterval: number;
let currentElement: Solid | Liquid | Gas | Element = new Sand(0);
let mouseX: number
let mouseY: number;
let currentInverseTransform: DOMMatrix;
const canvas = document.getElementById('canvas') as HTMLCanvasElement;

function getMousePosition(e: MouseEvent): void {
    let rect = canvas.getBoundingClientRect();
    let tempMouseX = (e.clientX - rect.left) * (800 / canvas.clientWidth);
    let tempMouseY = (e.clientY - rect.top) * (800 / canvas.clientWidth);

    let transformedPoint = currentInverseTransform.transformPoint(new DOMPoint(tempMouseX, tempMouseY));

    mouseX = transformedPoint.x;
    mouseY = transformedPoint.y;
}

export function updateCurrentTransform(baseTranform: DOMMatrix): void {
    currentInverseTransform = baseTranform.invertSelf();
}

export function setupControls() {
    // Prevent default right-click menu
    canvas.addEventListener("contextmenu", (event) => event.preventDefault());

    // Grid reset and fill buttons
    let resetButton = document.getElementById('reset') as HTMLButtonElement;
    resetButton.addEventListener('click', function () {
        grid.reset();
    });
    let fillButton = document.getElementById('fillgrid') as HTMLButtonElement;
    fillButton.addEventListener('click', function () {
        grid.fill();
    });

    // Reset camera postiion and scale on space
    window.addEventListener('keydown', (event) => {
        if (event.code === 'Space') {
            camera.x = 0;
            camera.y = 0;
            camera.scale = 1;
        }
    });

    // Zoom
    canvas.addEventListener("wheel", (event) => {
        event.preventDefault();
        let zoomFactor = 1.1;
        let newScale = event.deltaY < 0 ? camera.scale * zoomFactor : camera.scale / zoomFactor;

        camera.scale = Math.min(camera.maxScale, Math.max(camera.minScale, newScale));
    });

    // Panning Start
    let isPanning = false;
    let startX = 0, startY = 0;
    canvas.addEventListener("mousedown", (event) => {
        if (event.button === 2) {
            isPanning = true;
            startX = event.clientX + camera.x;
            startY = event.clientY + camera.y;
        }
    });
    // Panning Move
    canvas.addEventListener("mousemove", (event) => {
        if (isPanning) {
            camera.x = startX - event.clientX;
            camera.y = startY - event.clientY;
        }
    });
    // Panning end
    canvas.addEventListener("mouseup", () => isPanning = false);
    canvas.addEventListener("mouseleave", () => isPanning = false);

    // Brush start
    canvas.addEventListener('mousedown', function (e) {
        if (e.button === 0) {
            getMousePosition(e);

            brushInterval = setInterval(() => {
                let i = Math.floor(mouseX / gridWidth);
                let j = Math.floor(mouseY / gridWidth);
                if (i >= 0 && i < col && j >= 0 && j < row) {
                    grid.setBrush(i, j);
                }
            }, brushSpeed);
        }
    });
    // Brush move
    canvas.addEventListener('mousemove', function (e) {
        getMousePosition(e);

        // Calculate the grid position of the mouse
        let i = Math.floor(mouseX / gridWidth);
        let j = Math.floor(mouseY / gridWidth);

        if (i >= 0 && i < col && j >= 0 && j < row) {
            let mousePosition = document.getElementById('mousePosition') as HTMLDivElement;
            mousePosition.textContent = `Mouse position: ${i}, ${j}`;
        }
    });
    // Brush end
    canvas.addEventListener('mouseup', function () {
        clearInterval(brushInterval);
    });
    canvas.addEventListener('mouseleave', function () {
        clearInterval(brushInterval);
    });

    const controls: { [key: string]: () => any } = {
        'sand': () => new Sand(0),
        'wood': () => new Wood(0),
        'water': () => new Water(0),
        'smoke': () => new Smoke(0),
        'stone': () => new Stone(0),
        'fire': () => new Fire(0),
        'custom': () => new Custom(0),
        'eraser': () => new Empty(0),
    };

    Object.keys(controls).forEach(controlId => {
        let button = document.getElementById(controlId) as HTMLButtonElement;
        button.addEventListener('click', function () {
            Object.keys(controls).forEach(id => {
                let elementButton = document.getElementById(id) as HTMLButtonElement;
                elementButton.classList.remove('button-selected');
            });
            button.classList.add('button-selected');

            currentElement = controls[controlId]();
            localStorage.setItem('currentElement', controlId);
            let selected = document.getElementById('selected') as HTMLDivElement;
            selected.textContent = `Selected: ${controlId.charAt(0).toUpperCase() + controlId.slice(1)}`;
            updateHTMLValues();
        });
    });

    const brushControls: { [key: string]: () => any } = {
        'plusbrush': () => brushSize++,
        'minusbrush': () => brushSize = Math.max(0, brushSize - 1),
    };

    Object.keys(brushControls).forEach(controlId => {
        let button = document.getElementById(controlId) as HTMLButtonElement;
        button.addEventListener('click', function () {
            brushControls[controlId]();
            localStorage.setItem('brushSize', brushSize.toString());
            let brush = document.getElementById('brush') as HTMLDivElement;
            brush.textContent = `Brush Size: ${brushSize + 1}`;
        });
    });

    let storedElement = localStorage.getItem('currentElement') || 'sand';
    currentElement = controls[storedElement]();
    let selected = document.getElementById('selected') as HTMLDivElement;
    selected.textContent = `Selected: ${storedElement.charAt(0).toUpperCase() + storedElement.slice(1)}`;
    let storedElementButton = document.getElementById(storedElement) as HTMLButtonElement;
    storedElementButton.classList.add('button-selected');
    updateHTMLValues();

    let storedBrushSize = localStorage.getItem('brushSize') || '4';
    brushSize = parseInt(storedBrushSize);
    let brush = document.getElementById('brush') as HTMLDivElement;
    brush.textContent = `Brush Size: ${brushSize + 1}`;
}

export { currentElement, brushSize, mouseX, mouseY }

