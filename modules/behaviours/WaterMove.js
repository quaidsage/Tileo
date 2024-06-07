import { DEBUG_MOVEMENT } from "../config.js";
import Movement from "./Movement.js";

class WaterMove extends Movement {
    constructor({ maxSpeed, acceleration, velocity, dispersion } = {}) {
        super({ maxSpeed, acceleration, velocity });
        this.dispersion = dispersion ?? 0;
        this.previousPosition = -1;
    }

    disperse(element, grid) {
        const x = element.index % grid.row;
        const y = Math.floor(element.index / grid.col);

        let leftDistance = 0;
        let rightDistance = 0;
        while (leftDistance < this.dispersion) {
            if (grid.isValidIndex(x - leftDistance - 1, y) && grid.isPassable(y * grid.col + x - leftDistance - 1)) {
                leftDistance++;
            } else {
                break;
            }
        }
        while (rightDistance < this.dispersion) {
            if (grid.isValidIndex(x + rightDistance + 1, y) && grid.isPassable(y * grid.col + x + rightDistance + 1)) {
                rightDistance++;
            } else {
                break;
            }
        }
        if (leftDistance + rightDistance > 0) {
            if (DEBUG_MOVEMENT && leftDistance > rightDistance) element.debugColor = [255, 0, 255];
            if (DEBUG_MOVEMENT && leftDistance < rightDistance) element.debugColor = [255, 255, 0];
            if (DEBUG_MOVEMENT && leftDistance == rightDistance) element.debugColor = [255, 255, 255];
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

    update(element, grid) {
        super.update(element, grid);
        if (element.index == this.previousPosition) {
            this.disperse(element, grid);
        }
    }

}
export default WaterMove;