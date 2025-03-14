import { Sand, Water, Fire, Smoke, Wood, Stone, Custom, Empty } from './elements/ElementIndex.js';
import { gridWidth, col, row, grid, camera } from './renderer.js';
import { updateHTMLValues } from './editor.js';
import { closeCurrentMenu } from './toolbar.js';
let brushSpeed = 10;
let brushSize = 4;
let brushInterval;
let currentElement = new Sand(0);
let mouseX;
let mouseY;
let isInspecting = false;
let currentInverseTransform;
const canvas = document.getElementById('canvas');
function getMousePosition(e) {
    let rect = canvas.getBoundingClientRect();
    let tempMouseX = (e.clientX - rect.left) * (canvas.width / canvas.clientWidth);
    let tempMouseY = (e.clientY - rect.top) * (canvas.height / canvas.clientHeight);
    let transformedPoint = currentInverseTransform.transformPoint(new DOMPoint(tempMouseX, tempMouseY));
    mouseX = transformedPoint.x;
    mouseY = transformedPoint.y;
}
function setupCameraControls() {
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
        let zoomFactor = 1.05;
        let newScale = event.deltaY < 0 ? camera.scale * zoomFactor : camera.scale / zoomFactor;
        // Calculate the mouse position before zoom
        let rect = canvas.getBoundingClientRect();
        let mouseX = (event.clientX - rect.left) * (canvas.width / canvas.clientWidth);
        let mouseY = (event.clientY - rect.top) * (canvas.height / canvas.clientHeight);
        let transformedPoint = currentInverseTransform.transformPoint(new DOMPoint(mouseX, mouseY));
        // Apply the new scale
        camera.scale = Math.min(camera.maxScale, Math.max(camera.minScale, newScale));
        // Calculate the mouse position after zoom
        let newTransformedPoint = currentInverseTransform.transformPoint(new DOMPoint(mouseX, mouseY));
        // Adjust the camera position to keep the mouse position stable
        camera.x += (newTransformedPoint.x - transformedPoint.x);
        camera.y += (newTransformedPoint.y - transformedPoint.y);
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
}
function setupBrushControls() {
    // Brush start
    canvas.addEventListener('mousedown', function (e) {
        if (e.button === 0) {
            closeCurrentMenu();
            if (isInspecting) {
                return;
            }
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
        if (isInspecting) {
            return;
        }
        getMousePosition(e);
        // Calculate the grid position of the mouse
        let i = Math.floor(mouseX / gridWidth);
        let j = Math.floor(mouseY / gridWidth);
        if (i >= 0 && i < col && j >= 0 && j < row) {
            let mousePosition = document.getElementById('mousePosition');
            mousePosition.textContent = `Mouse position: ${i}, ${j}`;
        }
    });
    // Brush end
    canvas.addEventListener('mouseup', function () {
        if (isInspecting) {
            return;
        }
        clearInterval(brushInterval);
    });
    canvas.addEventListener('mouseleave', function () {
        if (isInspecting) {
            return;
        }
        clearInterval(brushInterval);
    });
}
function setupLegacyEditorControls() {
    // Grid reset and fill buttons
    let resetButton = document.getElementById('reset');
    resetButton.addEventListener('click', function () {
        grid.reset();
    });
    let fillButton = document.getElementById('fillgrid');
    fillButton.addEventListener('click', function () {
        grid.fill();
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
export function updateCurrentTransform(baseTranform) {
    currentInverseTransform = baseTranform.invertSelf();
}
export function setCurrentElement(element) {
    currentElement = element;
}
// add optional parameter to toggle inspect mode
export function toggleInspect(inspect) {
    if (inspect !== undefined) {
        isInspecting = inspect;
    }
    else {
        isInspecting = !isInspecting;
    }
}
export function setupControls() {
    // Prevent default right-click menu
    canvas.addEventListener("contextmenu", (event) => event.preventDefault());
    setupCameraControls();
    setupBrushControls();
    setupLegacyEditorControls();
}
export { currentElement, brushSize, mouseX, mouseY };
