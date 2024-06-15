import { gridWidth } from './renderer.js';
import { increaseSize, decreaseSize, setGridSize, grid } from './renderer.js';
import Empty from './elements/misc/empty.js';
import { parseColor, rgbToHex } from './utils.js';

export let DEBUG_VELOCITY = false;
export let DEBUG_MOVEMENT = false;
export let DEBUG_LIFE = false;

export let ALLOW_REPLACEMENT = false;

export let isPaused = false;
export let RENDER_DELAY = 0;

export function setupConfig() {
    const pauseButton: HTMLButtonElement = document.getElementById('pause') as HTMLButtonElement;
    pauseButton.addEventListener('click', function () {
        isPaused = !isPaused;
        this.textContent = isPaused ? 'Resume' : 'Pause';
    });

    const resetButton: HTMLButtonElement = document.getElementById('resetAll') as HTMLButtonElement;
    resetButton.addEventListener('click', function () {
        localStorage.clear();
        location.reload();
    });

    const replacementCheckbox: HTMLInputElement = document.getElementById('replacement') as HTMLInputElement;
    replacementCheckbox.addEventListener('change', function () {
        ALLOW_REPLACEMENT = this.checked;
    });

    const backgroundColorInput = document.getElementById('backgroundColor') as HTMLInputElement;
    backgroundColorInput.addEventListener('input', function (event) {
        if (event.target) {
            const inputElement = event.target as HTMLInputElement;
            Empty.currentColor = (parseColor(inputElement.value));
            grid.updateColor();
            localStorage.setItem('backgroundColor', inputElement.value);
        }
    });

    let dropdownMenu: HTMLSelectElement = document.getElementById('debugOptionsSelect') as HTMLSelectElement;
    let storedSelection = localStorage.getItem('dropdownValue') || '';

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

    const gridControls: { [key: string]: () => void } = {
        'plusgrid': () => increaseSize(),
        'minusgrid': () => decreaseSize(),
    };

    Object.keys(gridControls).forEach(controlId => {
        let controlButton: HTMLButtonElement = document.getElementById(controlId) as HTMLButtonElement;
        controlButton.addEventListener('click', function () {
            gridControls[controlId]();
            localStorage.setItem('gridSize', gridWidth.toString());
        });
    });

    const renderDelayInput: HTMLInputElement = document.getElementById('renderDelay') as HTMLInputElement;
    renderDelayInput.addEventListener('input', (event) => {
        if (event.target) {
            const inputElement = event.target as HTMLInputElement;
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


