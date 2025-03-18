import { Sand, Water, Fire, Smoke, Wood, Stone, Custom, Empty } from './elements/ElementIndex.js';
import { gridWidth, col, row, grid, camera, ctx, focusCanvas } from './renderer.js';
import { updateHTMLValues } from './ui/editor.js';
import Solid from './elements/solids/solid.js';
import Liquid from './elements/liquids/liquid.js';
import Gas from './elements/gases/gas.js';
import { drawElementInfo } from './ui/inspect-menu.js';
import { getBrushSpeed, toggleBrushMenu } from './ui/brush-menu.js';
import { togglePause } from './config.js';
import { toggleDrawMenu } from './ui/toolbar.js';

let PAUSE_KEY = 'Space';
let DRAW_MENU_KEY = 'KeyD';
let BRUSH_MENU_KEY = 'KeyC';

let brushInterval: number;
let currentElement: Solid | Liquid | Gas | Element = new Sand(0);
let mouseX: number
let mouseY: number;
let isInspecting: boolean = false;
let currentInverseTransform: DOMMatrix;
let currentElementInfo: HTMLDivElement = document.getElementById('element-details-menu') as HTMLDivElement;
const canvas = document.getElementById('canvas') as HTMLCanvasElement;

function getMousePosition(e: MouseEvent): void {
    let rect = canvas.getBoundingClientRect();
    let tempMouseX = (e.clientX - rect.left) * (canvas.width / canvas.clientWidth);
    let tempMouseY = (e.clientY - rect.top) * (canvas.height / canvas.clientHeight);

    let transformedPoint = currentInverseTransform.transformPoint(new DOMPoint(tempMouseX, tempMouseY));

    mouseX = transformedPoint.x;
    mouseY = transformedPoint.y;
}

function debugTool(transformedPoint: DOMPoint): void {
    //draw a point via html
    let point = document.createElement('div');
    point.style.position = 'absolute';
    point.style.width = '5px';
    point.style.height = '5px';
    point.style.backgroundColor = 'red';
    point.style.left = `${transformedPoint.x}px`;
    point.style.top = `${transformedPoint.y}px`;
    document.body.appendChild(point);
}

function setupCameraControls() {
    // Reset camera postiion and scale on space
    window.addEventListener('keydown', (event) => {
        if (event.code === 'Escape') {
            camera.x = 0;
            camera.y = 0;
            camera.scale = 1;
        }
    });

    // Zoom
    canvas.addEventListener("wheel", (event) => {
        event.preventDefault();
        const zoomFactor = 1.1;
        const newScale = event.deltaY < 0
            ? camera.scale * zoomFactor
            : camera.scale / zoomFactor;

        // Ensure the new scale is within the allowed range
        const clampedScale = Math.min(camera.maxScale, Math.max(camera.minScale, newScale));

        if (clampedScale === camera.scale) {
            return; // No change in scale
        }

        // Calculate the mouse position relative to canvas
        const rect = canvas.getBoundingClientRect();
        const canvasX = (event.clientX - rect.left) * (canvas.width / canvas.clientWidth);
        const canvasY = (event.clientY - rect.top) * (canvas.height / canvas.clientHeight);

        // Get the world coordinates before zoom
        const worldPointBeforeZoom = currentInverseTransform.transformPoint(
            new DOMPoint(canvasX, canvasY)
        );

        // debugTool(worldPointBeforeZoom);

        // Store the old scale and update to new scale
        const oldScale = camera.scale;
        camera.scale = clampedScale;

        // Apply the transform based on the updated camera scale
        const transform = ctx.getTransform();
        // Update the inverse transform matrix
        updateCurrentTransform(transform);

        // Calculate how the same screen point would map to world coordinates after the zoom
        const worldPointAfterZoom = currentInverseTransform.transformPoint(
            new DOMPoint(canvasX, canvasY)
        );

        // Adjust camera position to keep the point under cursor fixed in world space
        camera.x += (worldPointAfterZoom.x - worldPointBeforeZoom.x) * camera.scale;
        camera.y += (worldPointAfterZoom.y - worldPointBeforeZoom.y) * camera.scale;

        // Update the inverse transform again with the new camera position
        updateCurrentTransform(ctx.getTransform());
    });

    // Panning Start
    let isPanning = false;
    let startX = 0, startY = 0;
    canvas.addEventListener("mousedown", (event) => {
        if (event.button === 1) {
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
            focusCanvas();

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
            }, getBrushSpeed());
        }
    });

    // Brush move / inspect
    canvas.addEventListener('mousemove', function (e) {
        getMousePosition(e);

        // Calculate the grid position of the mouse
        let i = Math.floor(mouseX / gridWidth);
        let j = Math.floor(mouseY / gridWidth);

        if (i >= 0 && i < col && j >= 0 && j < row) {
            let mousePosition = document.getElementById('mousePosition') as HTMLDivElement;
            mousePosition.textContent = `Mouse position: ${i}, ${j}`;

            if (isInspecting) {
                drawElementInfo(i, j, e, currentElementInfo);
            } else {
                if (currentElementInfo) {
                    currentElementInfo.style.display = 'none';
                }
            }
        }
    });

    canvas.addEventListener('mousedown', function (e) {
        if (e.button === 2) {
            if (!isInspecting) {
                toggleInspect(true);
            }
            focusCanvas();
        }
    });

    // Brush end
    canvas.addEventListener('mouseup', function () {
        clearInterval(brushInterval);
    });
    canvas.addEventListener('mouseleave', function () {
        clearInterval(brushInterval);
    });
}

function setupHotkeys() {
    // Toggle pause key
    window.addEventListener('keydown', (event) => {
        if (event.code === PAUSE_KEY) {
            togglePause();
        }
    });

    window.addEventListener('keydown', (event) => {
        if (event.code === DRAW_MENU_KEY) {
            toggleDrawMenu();
        }
    });

    window.addEventListener('keydown', (event) => {
        if (event.code === BRUSH_MENU_KEY) {
            toggleBrushMenu();
        }
    });
}

function setupLegacyEditorControls() {
    // Grid reset and fill buttons
    let resetButton = document.getElementById('reset') as HTMLButtonElement;
    resetButton.addEventListener('click', function () {
        grid.reset();
    });
    let fillButton = document.getElementById('fillgrid') as HTMLButtonElement;
    fillButton.addEventListener('click', function () {
        grid.fill();
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
}

export function updateCurrentTransform(baseTranform: DOMMatrix): void {
    currentInverseTransform = baseTranform.invertSelf();
}

export function setCurrentElement(element: Solid | Liquid | Gas | Element) {
    currentElement = element;
}

// add optional parameter to toggle inspect mode
export function toggleInspect(inspect?: boolean) {
    if (inspect !== undefined) {
        isInspecting = inspect
    } else {
        isInspecting = !isInspecting;
    }
}

export function setupControls() {
    // Prevent default right-click menu
    canvas.addEventListener("contextmenu", (event) => event.preventDefault());

    setupCameraControls();

    setupBrushControls();

    setupHotkeys();

    setupLegacyEditorControls();
}

export { currentElement, mouseX, mouseY, isInspecting }

