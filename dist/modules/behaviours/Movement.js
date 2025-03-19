import Behaviour from './Behaviour.js';
import { DebugOptions, DEBUG_MODE } from '../config.js';
class Movement extends Behaviour {
    constructor({ maxSpeed = 0, acceleration = 0, velocity = 0 } = {}) {
        super();
        this.maxSpeed = maxSpeed !== null && maxSpeed !== void 0 ? maxSpeed : 0;
        this.acceleration = acceleration !== null && acceleration !== void 0 ? acceleration : 0;
        this.velocity = velocity !== null && velocity !== void 0 ? velocity : 0;
        this.previousPosition = -1;
    }
    resetVelocity(element) {
        if (DEBUG_MODE === DebugOptions.MOVEMENT || DEBUG_MODE === DebugOptions.VELOCITY) {
            element.debugColor = [0, 255, 0];
        }
        this.velocity = 0;
    }
    updateVelocity(element) {
        this.velocity += this.acceleration;
        this.velocity >= 0 ? this.velocity = Math.min(this.velocity, this.maxSpeed) : this.velocity = Math.max(this.velocity, -this.maxSpeed);
        if (DEBUG_MODE === DebugOptions.VELOCITY) {
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
    // TODO: Need to fix where solids with high velocity phase through solid elements
    step(element, grid, x, y, nx, ny) {
        let isInMovementDebugMode = DEBUG_MODE === DebugOptions.MOVEMENT;
        while (ny > y) {
            let moves = this.availableMoves(nx, ny, grid);
            if (moves[0] === 1) {
                grid.swap(y * grid.col + x, ny * grid.col + nx);
                if (isInMovementDebugMode) {
                    element.debugColor = [255, 0, 0];
                }
                break;
            }
            else if (moves[1] === 1) {
                grid.swap(y * grid.col + x, ny * grid.col + nx - 1);
                if (isInMovementDebugMode) {
                    element.debugColor = [0, 0, 255];
                }
                break;
            }
            else if (moves[2] === 1) {
                grid.swap(y * grid.col + x, ny * grid.col + nx + 1);
                if (isInMovementDebugMode) {
                    element.debugColor = [0, 0, 255];
                }
                break;
            }
            ny--;
        }
    }
    update(grid, element) {
        if (this.previousPosition === element.index) {
            this.resetVelocity(element);
        }
        else {
            this.updateVelocity(element);
        }
        this.previousPosition = element.index;
        const x = element.index % grid.col;
        const y = Math.floor(element.index / grid.col);
        let nx = x;
        let ny = y + Math.ceil(this.velocity) + 1;
        this.step(element, grid, x, y, nx, ny);
    }
}
export default Movement;
