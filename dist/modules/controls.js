import { Sand, Water, Fire, Smoke, Wood, Stone, Custom, Empty } from './elements/ElementIndex.js';
import { gridWidth, col, row, grid, camera } from './renderer.js';
import { updateHTMLValues } from './editor.js';
let brushSpeed = 10;
let brushSize = 4;
let brushInterval;
let currentElement = new Sand(0);
let mouseX;
let mouseY;
export function setupControls() {
    let canvas = document.getElementById('canvas');
    let resetButton = document.getElementById('reset');
    resetButton.addEventListener('click', function () {
        grid.reset();
    });
    let fillButton = document.getElementById('fillgrid');
    fillButton.addEventListener('click', function () {
        grid.fill();
    });
    canvas.addEventListener("wheel", (event) => {
        event.preventDefault();
        // Determine the zoom factor (zoom in or zoom out)
        let zoomFactor = 1.1;
        let newScale = event.deltaY < 0 ? camera.scale * zoomFactor : camera.scale / zoomFactor;
        // Constrain the new scale to the min and max scale values
        newScale = Math.min(camera.maxScale, Math.max(camera.minScale, newScale));
        // Calculate the relative mouse position on the canvas
        let mouseX = event.clientX - canvas.offsetLeft;
        let mouseY = event.clientY - canvas.offsetTop;
        // Calculate the relative position in the world coordinates (before zoom)
        let worldX = mouseX / camera.scale + camera.x;
        let worldY = mouseY / camera.scale + camera.y;
        // Set the new scale for the camera
        camera.scale = newScale;
        // Adjust the camera position to keep the point under the mouse in the same place
        camera.x = worldX - mouseX / camera.scale;
        camera.y = worldY - mouseY / camera.scale;
    });
    let isPanning = false;
    let startX = 0, startY = 0;
    canvas.addEventListener("mousedown", (event) => {
        if (event.button === 2) {
            isPanning = true;
            startX = event.clientX + camera.x;
            startY = event.clientY + camera.y;
        }
    });
    canvas.addEventListener("mousemove", (event) => {
        if (isPanning) {
            camera.x = startX - event.clientX;
            camera.y = startY - event.clientY;
        }
    });
    canvas.addEventListener("mouseup", () => isPanning = false);
    canvas.addEventListener("mouseleave", () => isPanning = false);
    // Prevent default right-click menu
    canvas.addEventListener("contextmenu", (event) => event.preventDefault());
    canvas.addEventListener("contextmenu", (event) => event.preventDefault());
    canvas.addEventListener('mousedown', function (e) {
        if (e.button === 0) {
            let rect = canvas.getBoundingClientRect();
            mouseX = (e.clientX - rect.left) * (800 / canvas.clientWidth);
            mouseY = (e.clientY - rect.top) * (800 / canvas.clientWidth);
            brushInterval = setInterval(() => {
                let i = Math.floor(mouseX / gridWidth);
                let j = Math.floor(mouseY / gridWidth);
                if (i >= 0 && i < col && j >= 0 && j < row) {
                    grid.setBrush(i, j);
                }
            }, brushSpeed);
        }
    });
    canvas.addEventListener('mouseup', function () {
        clearInterval(brushInterval);
    });
    canvas.addEventListener('mousemove', function (e) {
        let rect = canvas.getBoundingClientRect();
        mouseX = (e.clientX - rect.left) * (800 / canvas.clientWidth);
        mouseY = (e.clientY - rect.top) * (800 / canvas.clientWidth);
        // Calculate the grid position of the mouse
        let i = Math.floor(mouseX / gridWidth);
        let j = Math.floor(mouseY / gridWidth);
        if (i >= 0 && i < col && j >= 0 && j < row) {
            let mousePosition = document.getElementById('mousePosition');
            mousePosition.textContent = `Mouse position: ${i}, ${j}`;
        }
    });
    canvas.addEventListener('mouseleave', function () {
        clearInterval(brushInterval);
    });
    const controls = {
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
        let button = document.getElementById(controlId);
        button.addEventListener('click', function () {
            Object.keys(controls).forEach(id => {
                let elementButton = document.getElementById(id);
                elementButton.classList.remove('button-selected');
            });
            button.classList.add('button-selected');
            currentElement = controls[controlId]();
            localStorage.setItem('currentElement', controlId);
            let selected = document.getElementById('selected');
            selected.textContent = `Selected: ${controlId.charAt(0).toUpperCase() + controlId.slice(1)}`;
            updateHTMLValues();
        });
    });
    const brushControls = {
        'plusbrush': () => brushSize++,
        'minusbrush': () => brushSize = Math.max(0, brushSize - 1),
    };
    Object.keys(brushControls).forEach(controlId => {
        let button = document.getElementById(controlId);
        button.addEventListener('click', function () {
            brushControls[controlId]();
            localStorage.setItem('brushSize', brushSize.toString());
            let brush = document.getElementById('brush');
            brush.textContent = `Brush Size: ${brushSize + 1}`;
        });
    });
    let storedElement = localStorage.getItem('currentElement') || 'sand';
    currentElement = controls[storedElement]();
    let selected = document.getElementById('selected');
    selected.textContent = `Selected: ${storedElement.charAt(0).toUpperCase() + storedElement.slice(1)}`;
    let storedElementButton = document.getElementById(storedElement);
    storedElementButton.classList.add('button-selected');
    updateHTMLValues();
    let storedBrushSize = localStorage.getItem('brushSize') || '4';
    brushSize = parseInt(storedBrushSize);
    let brush = document.getElementById('brush');
    brush.textContent = `Brush Size: ${brushSize + 1}`;
}
export { currentElement, brushSize, mouseX, mouseY };
