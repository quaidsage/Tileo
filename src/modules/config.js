export let DEBUG_VELOCITY = false;
export let DEBUG_MOVEMENT = false;

document.getElementById('debugOptionsSelect').addEventListener('change', function () {
    DEBUG_VELOCITY = this.value === 'debugVelocity';
    DEBUG_MOVEMENT = this.value === 'debugMovement';
});