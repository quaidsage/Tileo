export let DEBUG_VELOCITY = false;
export let DEBUG_MOVEMENT = false;
export let DEBUG_LIFE = false;

document.getElementById('debugOptionsSelect').addEventListener('change', function () {
    DEBUG_VELOCITY = this.value === 'debugVelocity';
    DEBUG_MOVEMENT = this.value === 'debugMovement';
    DEBUG_LIFE = this.value === 'debugLife';
});