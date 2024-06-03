import Movement from "./Movement.js";
import { DEBUG_MOVEMENT } from "../config.js";

class GasMove extends Movement {
    constructor({ maxSpeed, acceleration, velocity, dispersion } = {}) {
        super({ maxSpeed, acceleration, velocity })
        this.dispersion = dispersion ?? 0;
    }

    step(element, grid, x, y, nx, ny) {
        while (ny < y) {
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
            ny++;
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
        let ny = y - Math.ceil(this.velocity) - 1;
        this.step(element, grid, x, y, nx, ny);
    }
}

export default GasMove;