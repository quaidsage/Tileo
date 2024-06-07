import { DEBUG_MOVEMENT } from "../config.js";
import SolidMove from "./SolidMove.js";

class GasMove extends SolidMove {
    constructor({ maxSpeed, acceleration, velocity, dispersion } = {}) {
        super({ maxSpeed, acceleration, velocity })
        this.dispersion = dispersion ?? 0;
    }

    disperse(element, grid) {
        const x = element.index % grid.row;
        const y = Math.floor(element.index / grid.col);

        let leftDistance = 0;
        let rightDistance = 0;
        while (leftDistance < this.dispersion) {
            if (grid.isValidIndex(x - leftDistance - 1, y) && grid.isEmpty(y * grid.col + x - leftDistance - 1)) {
                leftDistance++;
            } else {
                break;
            }
        }
        while (rightDistance < this.dispersion) {
            if (grid.isValidIndex(x + rightDistance + 1, y) && grid.isEmpty(y * grid.col + x + rightDistance + 1)) {
                rightDistance++;
            } else {
                break;
            }
        }
        if (leftDistance + rightDistance > 0) {
            if (DEBUG_MOVEMENT) element.debugColor = [255, 255, 0];
            if (leftDistance > rightDistance) {
                grid.swap(y * grid.col + x, y * grid.col + x - leftDistance);
            } if (leftDistance < rightDistance) {
                grid.swap(y * grid.col + x, y * grid.col + x + rightDistance);
            } else {
                if (Math.random() > 0.5) {
                    grid.swap(y * grid.col + x, y * grid.col + x - leftDistance);
                } else {
                    grid.swap(y * grid.col + x, y * grid.col + x + rightDistance);
                }
            }
        }
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
        this.disperse(element, grid);
    }
}

export default GasMove;