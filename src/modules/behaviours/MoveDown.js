import Behaviour from './Behaviour.js';
import { DEBUG_VELOCITY } from '../config.js';
import { DEBUG_MOVEMENT } from '../config.js';

class MoveDown extends Behaviour {
    constructor({ maxSpeed, acceleration, velocity } = {}) {
        super();
        this.maxSpeed = maxSpeed ?? 0;
        this.acceleration = acceleration ?? 0;
        this.velocity = velocity ?? 0;
    }

    resetVelocity(element) {
        this.velocity = 0;
        if (DEBUG_VELOCITY || DEBUG_MOVEMENT) {
            element.debugColor = [0, 255, 0];
        }
    }

    updateVelocity(element) {
        this.velocity += this.acceleration;
        this.velocity >= 0 ? this.velocity = Math.min(this.velocity, this.maxSpeed) : this.velocity = Math.max(this.velocity, -this.maxSpeed);
        if (DEBUG_VELOCITY) {
            element.debugColor = [Math.abs(this.velocity) * 100, 100, 0];
        }
    }

    availableMoves(nx, ny, grid) {
        const moves = [0, 0, 0];
        if (grid.isValidIndex(nx, ny) && grid.isEmpty(ny * grid.col + nx)) {
            moves[0] = 1; // Move down
        }
        if (grid.isValidIndex(nx - 1, ny) && grid.isEmpty(ny * grid.col + nx - 1)) {
            moves[1] = 1; // Move down left
        }
        if (grid.isValidIndex(nx + 1, ny) && grid.isEmpty(ny * grid.col + nx + 1)) {
            moves[2] = 1; // Move down right
        }
        return moves;
    }

    step(element, grid, x, y, nx, ny) {
        let steps = 0;
        while (steps < Math.abs(Math.ceil(this.velocity))) {
            let moves = this.availableMoves(nx, ny, grid);
            if (moves[0] === 1) {
                grid.swap(y * grid.col + x, ny * grid.col + nx);
                if (DEBUG_MOVEMENT) {
                    element.debugColor = [255, 0, 0];
                }
            } else if (moves[1] === 1) {
                grid.swap(y * grid.col + x, ny * grid.col + nx - 1);
                if (DEBUG_MOVEMENT) {
                    element.debugColor = [0, 0, 255];
                }
            } else if (moves[2] === 1) {
                grid.swap(y * grid.col + x, ny * grid.col + nx + 1);
                if (DEBUG_MOVEMENT) {
                    element.debugColor = [0, 0, 255];
                }
            } else {
                this.resetVelocity(element);
            }
            ny--;
            steps++;
        }
    }

    update(element, grid) {
        this.updateVelocity(element);
        const x = element.index % grid.row;
        const y = Math.floor(element.index / grid.col);
        let nx = x;
        let ny = y + Math.ceil(this.velocity);
        this.step(element, grid, x, y, nx, ny);
    }

}
export default MoveDown;