import { gridWidth } from './renderer.js';
import { increaseSize, decreaseSize, setGridSize, grid } from './renderer.js';
import Empty from './elements/misc/empty.js';
import { parseColor, rgbToHex } from './utils.js';
import Movement from './behaviours/Movement.js';
import Life from './behaviours/Life.js';
export let ALLOW_REPLACEMENT = false;
export let isPaused = false;
export let RENDER_DELAY = 0;
export var DebugOptions;
(function (DebugOptions) {
    DebugOptions[DebugOptions["NONE"] = 0] = "NONE";
    DebugOptions[DebugOptions["VELOCITY"] = 1] = "VELOCITY";
    DebugOptions[DebugOptions["MOVEMENT"] = 2] = "MOVEMENT";
    DebugOptions[DebugOptions["LIFE"] = 3] = "LIFE";
})(DebugOptions || (DebugOptions = {}));
export let DEBUG_MODE = DebugOptions.NONE;
function legacyConfig() {
    const pauseButton = document.getElementById('pause');
    pauseButton.addEventListener('click', function () {
        isPaused = !isPaused;
        this.textContent = isPaused ? 'Resume' : 'Pause';
    });
    const resetButton = document.getElementById('resetAll');
    resetButton.addEventListener('click', function () {
        localStorage.clear();
        location.reload();
    });
    const replacementCheckbox = document.getElementById('replacement');
    replacementCheckbox.addEventListener('change', function () {
        ALLOW_REPLACEMENT = this.checked;
    });
    const backgroundColorInput = document.getElementById('backgroundColor');
    backgroundColorInput.addEventListener('input', function (event) {
        if (event.target) {
            const inputElement = event.target;
            Empty.currentColor = (parseColor(inputElement.value));
            grid.updateColor();
            localStorage.setItem('backgroundColor', inputElement.value);
        }
    });
    let dropdownMenu = document.getElementById('debugOptionsSelect');
    let storedSelection = localStorage.getItem('dropdownValue') || '';
    const gridControls = {
        'plusgrid': () => increaseSize(),
        'minusgrid': () => decreaseSize(),
    };
    Object.keys(gridControls).forEach(controlId => {
        let controlButton = document.getElementById(controlId);
        controlButton.addEventListener('click', function () {
            gridControls[controlId]();
            localStorage.setItem('gridSize', gridWidth.toString());
        });
    });
    const renderDelayInput = document.getElementById('renderDelay');
    renderDelayInput.addEventListener('input', (event) => {
        if (event.target) {
            const inputElement = event.target;
            RENDER_DELAY = parseInt(inputElement.value);
            localStorage.setItem('RENDER_DELAY', inputElement.value);
        }
    });
    let storedRenderDelay = localStorage.getItem('RENDER_DELAY') || '0';
    RENDER_DELAY = parseInt(storedRenderDelay);
    renderDelayInput.value = RENDER_DELAY.toString();
    let storedGridSize = localStorage.getItem('gridSize') || '5';
    setGridSize(parseInt(storedGridSize));
    let storedBackgroundColor = localStorage.getItem('backgroundColor') || rgbToHex(Empty.defaultColor);
    backgroundColorInput.value = storedBackgroundColor;
    Empty.currentColor = (parseColor(storedBackgroundColor));
    grid.updateColor();
}
export function setupConfig() {
    console.log("config");
}
export function toggleDebug(debugMode) {
    if (DEBUG_MODE === debugMode) {
        DEBUG_MODE = DebugOptions.NONE;
    }
    else {
        DEBUG_MODE = debugMode;
    }
    if (DEBUG_MODE !== DebugOptions.NONE) {
        grid.grid.forEach((element, index) => {
            let hasMovementBehaviour = (element.getBehaviour(Movement));
            let hasLifeBehaviour = (element.getBehaviour(Life));
            let isElementEmpty = element instanceof Empty;
            if (!isElementEmpty) {
                if (DEBUG_MODE === DebugOptions.VELOCITY && !hasMovementBehaviour) {
                    element.debugColor = [255, 255, 255];
                }
                if (DEBUG_MODE === DebugOptions.MOVEMENT && !hasMovementBehaviour) {
                    element.debugColor = [255, 255, 255];
                }
                if (DEBUG_MODE === DebugOptions.LIFE && !hasLifeBehaviour) {
                    element.debugColor = [255, 255, 255];
                }
            }
        });
    }
}
export function togglePause(val) {
    if (val !== undefined)
        isPaused = val;
    else
        isPaused = !isPaused;
}
