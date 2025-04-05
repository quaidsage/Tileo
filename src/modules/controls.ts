import { Sand, Water, Fire, Smoke, Wood, Stone, Custom, Empty } from './elements/ElementIndex.js';
import { gridWidth, col, row, grid, camera, ctx, focusCanvas } from './renderer.js';
import Solid from './elements/solids/solid.js';
import Liquid from './elements/liquids/liquid.js';
import Gas from './elements/gases/gas.js';
import { drawElementInfo } from './ui/inspect-menu.js';
import { getBrushSpeed, toggleBrushMenu } from './ui/brush-menu.js';
import { togglePause } from './config.js';
import { toggleDrawMenu, toggleUtilityMenu } from './ui/toolbar.js';

let PAUSE_KEY = 'Space';
let DRAW_MENU_KEY = 'KeyD';
let BRUSH_MENU_KEY = 'KeyC';
let UTILITY_MENU_KEY = 'KeyU';

let brushInterval: number;
let currentElement: Solid | Liquid | Gas | Element = new Sand(0);
let mouseX: number
let mouseY: number;
let isInspecting: boolean = false;
let currentInverseTransform: DOMMatrix;
let currentElementInfo: HTMLDivElement = document.getElementById('element-details-menu') as HTMLDivElement;
const canvas = document.getElementById('canvas') as HTMLCanvasElement;

let lastTouchDist: number | null = null;

function getTouchDistance(touches: TouchList): number {
    if (touches.length < 2) return 0;
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
}
function getMousePosition(e: MouseEvent): void {
    let rect = canvas.getBoundingClientRect();
    let tempMouseX = (e.clientX - rect.left) * (canvas.width / canvas.clientWidth);
    let tempMouseY = (e.clientY - rect.top) * (canvas.height / canvas.clientHeight);

    let transformedPoint = currentInverseTransform.transformPoint(new DOMPoint(tempMouseX, tempMouseY));

    mouseX = transformedPoint.x;
    mouseY = transformedPoint.y;
}
function getTouchPosition(touch: Touch): void {
    const rect = canvas.getBoundingClientRect();
    const canvasX = (touch.clientX - rect.left) * (canvas.width / canvas.clientWidth);
    const canvasY = (touch.clientY - rect.top) * (canvas.height / canvas.clientHeight);

    const worldPos = currentInverseTransform.transformPoint(new DOMPoint(canvasX, canvasY));
    mouseX = worldPos.x;
    mouseY = worldPos.y;
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
        // Calculate new scale based on mouse wheel delta
        const zoomFactor = 1.1;
        const newScale = event.deltaY < 0
            ? camera.scale * zoomFactor
            : camera.scale / zoomFactor;
    
        const clampedScale = Math.min(camera.maxScale, Math.max(camera.minScale, newScale));
        if (clampedScale === camera.scale) return;
        
        // Calculate mouse position relative to canvas
        const rect = canvas.getBoundingClientRect();
        const canvasX = (event.clientX - rect.left) * (canvas.width / canvas.clientWidth);
        const canvasY = (event.clientY - rect.top) * (canvas.height / canvas.clientHeight);
        
        // Get mouse position in world space before zoom
        const worldPointBefore = currentInverseTransform.transformPoint(
            new DOMPoint(canvasX, canvasY)
        );
    
        // Apply new scale to camera
        camera.scale = clampedScale;
    
        // Build new transform manually based on updated camera
        // This needs to be done as the renderer may have not applied 
        // the new camera scale.
        const postInverseTransform = new DOMMatrix()
            .translate(-camera.x, -camera.y)
            .scale(camera.scale).inverse();
        
        // Get mouse position in world space after zoom
        const worldPointAfter = postInverseTransform.transformPoint(
            new DOMPoint(canvasX, canvasY)
        );
    
        // Adjust camera to keep mouse fixed in world space
        camera.x += (worldPointBefore.x - worldPointAfter.x) * camera.scale;
        camera.y += (worldPointBefore.y - worldPointAfter.y) * camera.scale;
    }, { passive: true });
    

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

function setupMobileCameraControls() {
    let isPanning = false;
    let startPanX = 0, startPanY = 0;

    // Start pan
    canvas.addEventListener("touchstart", (e) => {
        if (e.touches.length === 1 && isInspecting) {
            clearInterval(brushInterval);
            focusCanvas();
            const touch = e.touches[0];
            isPanning = true;
            startPanX = touch.clientX + camera.x;
            startPanY = touch.clientY + camera.y;

            // Show element inspect on touch
            getTouchPosition(touch);
            const i = Math.floor(mouseX / gridWidth);
            const j = Math.floor(mouseY / gridWidth);
            if (i >= 0 && i < col && j >= 0 && j < row) {
                drawElementInfo(i, j, e, currentElementInfo);
            } else if (currentElementInfo) {
                currentElementInfo.style.display = 'none';
            }
        }
    }, { passive: false });
    
    // Move pan
    canvas.addEventListener("touchmove", (e) => {
        if (isPanning && e.touches.length === 1) {
            clearInterval(brushInterval);
            e.preventDefault();

            const touch = e.touches[0];
            camera.x = startPanX - touch.clientX;
            camera.y = startPanY - touch.clientY;
            
            // Hide inspect on pan move
            if (currentElementInfo) {
                currentElementInfo.style.display = 'none';
            }
        }
    }, { passive: false });
    
    // End pan
    canvas.addEventListener("touchend", () => {
        isPanning = false;
    });

    // Zoom
    canvas.addEventListener("touchmove", (e) => {
        if (e.touches.length === 2 && isInspecting) {
            e.preventDefault(); 
            const dist = getTouchDistance(e.touches);
    
            if (lastTouchDist != null) {
                // Calculate zoom
                const zoomFactor = 1.05;
                const scaleDelta = dist > lastTouchDist ? zoomFactor : 1 / zoomFactor;
                const newScale = Math.min(camera.maxScale, Math.max(camera.minScale, camera.scale * scaleDelta));
                if (newScale === camera.scale) return;

                // Get center of touches
                const rect = canvas.getBoundingClientRect();
                const centerX = (e.touches[0].clientX + e.touches[1].clientX) / 2 - rect.left;
                const centerY = (e.touches[0].clientY + e.touches[1].clientY) / 2 - rect.top;
                
                // Get center point relative to canvas
                const canvasX = centerX * (canvas.width / canvas.clientWidth);
                const canvasY = centerY * (canvas.height / canvas.clientHeight);
                
                // Get center touch position in world space 
                const worldPointBefore = currentInverseTransform.transformPoint(new DOMPoint(canvasX, canvasY));
                
                // Apply new scale to camera
                camera.scale = newScale;
    
                // Build new transform manually
                const inversePost = new DOMMatrix()
                    .translate(-camera.x, -camera.y)
                    .scale(camera.scale).inverse();
                
                // Get new center point position in world space, move camera appropriately
                const worldPointAfter = inversePost.transformPoint(new DOMPoint(canvasX, canvasY));

                camera.x += (worldPointBefore.x - worldPointAfter.x) * camera.scale;
                camera.y += (worldPointBefore.y - worldPointAfter.y) * camera.scale;
            }

            lastTouchDist = dist;

            // Hide inspect on zoom
            if (currentElementInfo) {
                currentElementInfo.style.display = 'none';
            }
        }
    }, { passive: false });
    
    // End zoom
    canvas.addEventListener("touchend", () => {
        lastTouchDist = null;
    });
}

function setupMobileBrushControls() {
    // Start brush / inspect at touch point
    canvas.addEventListener('touchstart', function (e) {
        e.preventDefault();
        focusCanvas();

        if (isInspecting) return;
    
        const touch = e.touches[0];
        getTouchPosition(touch);

        brushInterval = setInterval(() => {
            const i = Math.floor(mouseX / gridWidth);
            const j = Math.floor(mouseY / gridWidth);
            if (i >= 0 && i < col && j >= 0 && j < row) {
                grid.setBrush(i, j);
            }
        }, getBrushSpeed());
    }, { passive: false });
    
    // Move brush / remove inspect
    canvas.addEventListener('touchmove', function (e) {
        e.preventDefault();

        if (isInspecting) return;

        getTouchPosition(e.touches[0]);

        if (isInspecting) {
            clearInterval(brushInterval);

            if (currentElementInfo) {
                currentElementInfo.style.display = 'none';
            }
        }
    }, { passive: false });
    
    // End brush / inspect
    canvas.addEventListener('touchend', function () {
        clearInterval(brushInterval);
    });
    canvas.addEventListener('touchcancel', function () {
        clearInterval(brushInterval);
    });
    
}

function setupBrushControls() {
    // Brush start
    canvas.addEventListener('mousedown', function (e) {
        if (e.button === 0) {
            focusCanvas();

            if (isInspecting) return;

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
        if (event.code === UTILITY_MENU_KEY) {
            toggleUtilityMenu();
        }
    });

    window.addEventListener('keydown', (event) => {
        if (event.code === BRUSH_MENU_KEY) {
            toggleBrushMenu();
        }
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

    if (!isInspecting) currentElementInfo.style.display = 'none';
}

export function setupControls() {
    // Prevent default right-click menu
    canvas.addEventListener("contextmenu", (event) => event.preventDefault());

    setupCameraControls();
    setupMobileCameraControls();

    setupBrushControls();
    setupMobileBrushControls()

    setupHotkeys();
}

export { currentElement, mouseX, mouseY, isInspecting }

