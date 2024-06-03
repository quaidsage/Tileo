export let DEBUG_VELOCITY = false;
export let DEBUG_MOVEMENT = false;
export let DEBUG_LIFE = false;

export let ALLOW_REPLACEMENT = false;

export let isPaused = false;

document.getElementById('pause').addEventListener('click', function () {
    isPaused = !isPaused;
    this.textContent = isPaused ? 'Resume' : 'Pause';
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


document.getElementById('replacement').addEventListener('change', function () {
    ALLOW_REPLACEMENT = this.value;
});