import { gridWidth } from './renderer.js';
import { increaseSize, decreaseSize, setGridSize } from './renderer.js';

export let DEBUG_VELOCITY = false;
export let DEBUG_MOVEMENT = false;
export let DEBUG_LIFE = false;

export let ALLOW_REPLACEMENT = false;

export let isPaused = false;
export let RENDER_DELAY = 10;

export function setupConfig() {
    document.getElementById('pause').addEventListener('click', function () {
        isPaused = !isPaused;
        this.textContent = isPaused ? 'Resume' : 'Pause';
    });

    document.getElementById('resetAll').addEventListener('click', function () {
        localStorage.clear();
        location.reload();
    });

    document.getElementById('replacement').addEventListener('change', function () {
        ALLOW_REPLACEMENT = this.value;
    });

    let dropdownMenu = document.getElementById('debugOptionsSelect');
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
    });

    const gridControls = {
        'plusgrid': () => increaseSize(),
        'minusgrid': () => decreaseSize(),
    };

    Object.keys(gridControls).forEach(controlId => {
        document.getElementById(controlId).addEventListener('click', function () {
            gridControls[controlId]();
            localStorage.setItem('gridSize', gridWidth);
        });
    });

    document.getElementById('renderDelay').addEventListener('input', (event) => {
        localStorage.setItem('RENDER_DELAY', event.target.value);
        RENDER_DELAY = event.target.value;
    });

    let storedRenderDelay = localStorage.getItem('RENDER_DELAY') || 10;
    RENDER_DELAY = parseInt(storedRenderDelay);
    document.getElementById('renderDelay').value = RENDER_DELAY;

    let storedGridSize = localStorage.getItem('gridSize') || 10;
    setGridSize(parseInt(storedGridSize));
}


