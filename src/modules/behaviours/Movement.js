import Behaviour from './Behaviour.js';
import { DEBUG_VELOCITY } from '../config.js';
import { DEBUG_MOVEMENT } from '../config.js';

class MoveDown extends Behaviour {
    constructor({ maxSpeed, acceleration, velocity } = {}) {
        super();
        this.maxSpeed = maxSpeed ?? 0;
        this.acceleration = acceleration ?? 0;
        this.velocity = velocity ?? 0;
        this.previousPosition = -1;
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
            element.debugColor = [Math.abs(this.velocity) * 100, 100 - (Math.abs(this.velocity) * 10), 0];
            if (this.velocity == this.maxSpeed) {
                element.debugColor = [255, 0, 100];
            }
        }
    }

    availableMoves(nx, ny, grid) {
        const moves = [0, 0, 0];
        if (grid.isValidIndex(nx, ny) && grid.isEmpty(ny * grid.col + nx)) {
            moves[0] = 1;
        }
        if (grid.isValidIndex(nx - 1, ny) && grid.isEmpty(ny * grid.col + nx - 1)) {
            moves[1] = 1;
        }
        if (grid.isValidIndex(nx + 1, ny) && grid.isEmpty(ny * grid.col + nx + 1)) {
            moves[2] = 1;
        }
        return moves;
    }

    // Need to fix where solids with high velocity phase through solid elements
    step(element, grid, x, y, nx, ny) {
        while (ny > y) {
            let moves = this.availableMoves(nx, ny, grid);
            if (moves[0] === 1) {
                grid.swap(y * grid.col + x, ny * grid.col + nx);
                if (DEBUG_MOVEMENT) {
                    element.debugColor = [255, 0, 0];
                }
                break;
            } else if (moves[1] === 1) {
                grid.swap(y * grid.col + x, ny * grid.col + nx - 1);
                if (DEBUG_MOVEMENT) {
                    element.debugColor = [0, 0, 255];
                }
                break;
            } else if (moves[2] === 1) {
                grid.swap(y * grid.col + x, ny * grid.col + nx + 1);
                if (DEBUG_MOVEMENT) {
                    element.debugColor = [0, 0, 255];
                }
                break;
            }
            ny--;
        }
    }

    update(element, grid) {
        if (this.previousPosition === element.index) {
            this.resetVelocity(element);
        } else {
            this.updateVelocity(element);
        }
        this.previousPosition = element.index;
        const x = element.index % grid.row;
        const y = Math.floor(element.index / grid.col);
        let nx = x;
        let ny = y + Math.ceil(this.velocity) + 1;
        this.step(element, grid, x, y, nx, ny);
    }

}
export default MoveDown;