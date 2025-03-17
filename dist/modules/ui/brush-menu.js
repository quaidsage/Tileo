import { currentElement } from "../controls.js";
import Empty from "../elements/misc/empty.js";
import { gridWidth } from "../renderer.js";
let brushSpeed = 90;
let brushSize = 8;
const minBrushSize = 0;
const maxBrushSize = 25;
const minBrushSpeed = 1;
const maxBrushSpeed = 100;
let currentBrushMenu;
function updatePreview() {
    // Get preview and content
    let previewCanvas = document.getElementById('brush-preview-canvas');
    let ctx = previewCanvas.getContext('2d');
    // Clear preview
    ctx.clearRect(0, 0, previewCanvas.width, previewCanvas.height);
    // draw pixel circle
    let x = (previewCanvas.width / gridWidth) / 2;
    let y = (previewCanvas.height / gridWidth) / 2;
    let elementConstructor = Object.getPrototypeOf(currentElement).constructor;
    for (let i = x - brushSize; i <= x + brushSize; i++) {
        for (let j = y - brushSize; j <= y + brushSize; j++) {
            let dx = i - x;
            let dy = j - y;
            if (dx * dx + dy * dy <= brushSize * brushSize) {
                if (currentElement.constructor.name === "Empty") {
                    ctx.fillStyle = 'rgba(255, 255, 255, 1)';
                }
                else {
                    ctx.fillStyle = `rgba(${elementConstructor.currentColor[0]}, ${elementConstructor.currentColor[1]}, ${elementConstructor.currentColor[2]}, 1)`;
                }
                ctx.fillRect(i * gridWidth, j * gridWidth, gridWidth, gridWidth);
            }
        }
    }
}
function addControls() {
    // create div for sliders and labels to go into
    let brushControls = document.createElement('div');
    brushControls.id = 'brush-controls';
    currentBrushMenu === null || currentBrushMenu === void 0 ? void 0 : currentBrushMenu.appendChild(brushControls);
    // slider for brush size and speed
    let brushSizeSlider = document.createElement('input');
    brushSizeSlider.type = 'range';
    brushSizeSlider.min = `${minBrushSize}`;
    brushSizeSlider.max = `${maxBrushSize}`;
    brushSizeSlider.value = brushSize.toString();
    brushSizeSlider.id = 'brush-size-slider';
    brushSizeSlider.oninput = (e) => {
        brushSize = parseInt(e.target.value);
        brushSizeLabel.textContent = `Brush Size: ${brushSize + 1}`;
        updatePreview();
    };
    let brushSpeedSlider = document.createElement('input');
    brushSpeedSlider.type = 'range';
    brushSpeedSlider.min = `${minBrushSpeed}`;
    brushSpeedSlider.max = `${maxBrushSpeed}`;
    brushSpeedSlider.value = brushSpeed.toString();
    brushSpeedSlider.id = 'brush-speed-slider';
    brushSpeedSlider.oninput = (e) => {
        brushSpeed = parseInt(e.target.value);
        brushSpeedLabel.textContent = `Brush Speed: ${brushSpeed}`;
    };
    // labels for sliders
    let brushSizeLabel = document.createElement('label');
    brushSizeLabel.htmlFor = 'brush-size-slider';
    brushSizeLabel.textContent = `Brush Size: ${brushSize + 1}`;
    let brushSpeedLabel = document.createElement('label');
    brushSpeedLabel.htmlFor = 'brush-speed-slider';
    brushSpeedLabel.textContent = `Brush Speed: ${brushSpeed}`;
    // append sliders and labels to brushControls
    brushControls.appendChild(brushSizeLabel);
    brushControls.appendChild(brushSizeSlider);
    brushControls.appendChild(brushSpeedLabel);
    brushControls.appendChild(brushSpeedSlider);
    let closeButton = document.createElement('button');
    closeButton.id = 'close-brush-menu';
    closeButton.textContent = 'Close';
    closeButton.onclick = () => {
        closeCurrentBrushMenu();
    };
    brushControls === null || brushControls === void 0 ? void 0 : brushControls.appendChild(closeButton);
}
function addPreview() {
    // create div for brush preview
    let brushPreview = document.createElement('div');
    brushPreview.id = 'brush-preview';
    currentBrushMenu === null || currentBrushMenu === void 0 ? void 0 : currentBrushMenu.appendChild(brushPreview);
    // create canvas for brush preview
    let previewCanvas = document.createElement('canvas');
    previewCanvas.width = 400;
    previewCanvas.height = 400;
    previewCanvas.id = 'brush-preview-canvas';
    previewCanvas.style.backgroundColor = `rgba(${Empty.currentColor[0]}, ${Empty.currentColor[1]}, ${Empty.currentColor[2]}, 1)`;
    brushPreview.appendChild(previewCanvas);
    updatePreview();
}
function addContent() {
    addPreview();
    addControls();
}
function createMenu() {
    let itemMenu = document.createElement('div');
    itemMenu.id = 'brush-menu';
    currentBrushMenu = itemMenu;
    document.body.appendChild(itemMenu);
}
export function openBrushMenu() {
    createMenu();
    addContent();
}
export function setBrushSize(size) {
    brushSize = size;
}
export function setBrushSpeed(speed) {
    brushSpeed = speed;
}
export function getBrushSize() {
    return brushSize;
}
export function getBrushSpeed() {
    return maxBrushSpeed - brushSpeed;
}
export function getCurrentBrushMenu() {
    return currentBrushMenu;
}
export function closeCurrentBrushMenu() {
    currentBrushMenu === null || currentBrushMenu === void 0 ? void 0 : currentBrushMenu.remove();
    currentBrushMenu = null;
}
