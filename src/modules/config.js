export let DEBUG_VELOCITY = false;
export let DEBUG_MOVEMENT = false;

document.getElementById('debugVelocity').addEventListener('change', function () {
    DEBUG_VELOCITY = this.checked;
});

document.getElementById('debugMovement').addEventListener('change', function () {
    DEBUG_MOVEMENT = this.checked;
});
