import { gridWidth } from './renderer.js';
import { increaseSize, decreaseSize, setGridSize, grid } from './renderer.js';
import Empty from './elements/misc/empty.js';
import { parseColor, rgbToHex } from './utils.js';
export var DEBUG_VELOCITY = false;
export var DEBUG_MOVEMENT = false;
export var DEBUG_LIFE = false;
export var ALLOW_REPLACEMENT = false;
export var isPaused = false;
export var RENDER_DELAY = 0;
export function setupConfig() {
    var pauseButton = document.getElementById('pause');
    pauseButton.addEventListener('click', function () {
        isPaused = !isPaused;
        this.textContent = isPaused ? 'Resume' : 'Pause';
    });
    var resetButton = document.getElementById('resetAll');
    resetButton.addEventListener('click', function () {
        localStorage.clear();
        location.reload();
    });
    var replacementCheckbox = document.getElementById('replacement');
    replacementCheckbox.addEventListener('change', function () {
        ALLOW_REPLACEMENT = this.checked;
    });
    var backgroundColorInput = document.getElementById('backgroundColor');
    backgroundColorInput.addEventListener('input', function (event) {
        if (event.target) {
            var inputElement = event.target;
            Empty.currentColor = (parseColor(inputElement.value));
            grid.updateColor();
            localStorage.setItem('backgroundColor', inputElement.value);
        }
    });
    var dropdownMenu = document.getElementById('debugOptionsSelect');
    var storedSelection = localStorage.getItem('dropdownValue') || '';
    dropdownMenu.value = storedSelection;
    DEBUG_VELOCITY = storedSelection === 'debugVelocity';
    DEBUG_MOVEMENT = storedSelection === 'debugMovement';
    DEBUG_LIFE = storedSelection === 'debugLife';
    dropdownMenu.addEventListener('change', function () {
        localStorage.setItem('dropdownValue', this.value);
        DEBUG_VELOCITY = this.value === 'debugVelocity';
        DEBUG_MOVEMENT = this.value === 'debugMovement';
        DEBUG_LIFE = this.value === 'debugLife';
        grid.drawAll();
    });
    var gridControls = {
        'plusgrid': function () { return increaseSize(); },
        'minusgrid': function () { return decreaseSize(); },
    };
    Object.keys(gridControls).forEach(function (controlId) {
        var controlButton = document.getElementById(controlId);
        controlButton.addEventListener('click', function () {
            gridControls[controlId]();
            localStorage.setItem('gridSize', gridWidth.toString());
        });
    });
    var renderDelayInput = document.getElementById('renderDelay');
    renderDelayInput.addEventListener('input', function (event) {
        if (event.target) {
            var inputElement = event.target;
            RENDER_DELAY = parseInt(inputElement.value);
            localStorage.setItem('RENDER_DELAY', inputElement.value);
        }
    });
    var storedRenderDelay = localStorage.getItem('RENDER_DELAY') || '0';
    RENDER_DELAY = parseInt(storedRenderDelay);
    renderDelayInput.value = RENDER_DELAY.toString();
    var storedGridSize = localStorage.getItem('gridSize') || '5';
    setGridSize(parseInt(storedGridSize));
    var storedBackgroundColor = localStorage.getItem('backgroundColor') || rgbToHex(Empty.defaultColor);
    backgroundColorInput.value = storedBackgroundColor;
    Empty.currentColor = (parseColor(storedBackgroundColor));
    grid.updateColor();
}
