import Element from './element.js';
import {grid} from '../renderer.js';
import {randomColor} from '../utils.js';

class Sand extends Element {
    constructor() {
        super({
            color: randomColor([255,255,0]), 
            still: false, 
            liquid: false, 
            probability: 0.6,
            velocity: 0,
            maxVelocity: 20,
            acceleration: 5
        });
    }
    update(i) {
        let bottom = i + grid.col;
        if (bottom >= grid.grid.length) {
            return;
        }
        let bottomLeft = bottom - 1;
        let bottomRight = bottom + 1;
        let column = i % grid.col;
        if ((Math.ceil(bottom / grid.row) < grid.row - 1) && (grid.isEmpty(bottom) || grid.isLiquid(bottom))) {
            this.falling = true;
            this.updateVelocity();
        } else {
            this.falling = false;
            this.velocity = 0;
        }

        if (this.falling) {
            for (let m = 0; m < this.velocity/10; m++) {
                if ((Math.ceil((bottom+grid.row) / grid.row) < grid.row - 1) && (grid.isEmpty(bottom+grid.row) || grid.isLiquid(bottom+grid.row))) {
                    bottom += grid.row;
                } else {
                    break;
                }
            }
            grid.swap(i, bottom);
        } else if ((bottomLeft % grid.col < column && (grid.isEmpty(bottomLeft) || grid.isLiquid(bottomLeft)))) {
                grid.swap(i, bottomLeft);
        } else if (bottomRight % grid.col > column && (grid.isEmpty(bottomRight) || grid.isLiquid(bottomRight))) {
            grid.swap(i, bottomRight);
        } 
    }

    updateVelocity() {
        this.velocity += this.acceleration;
        if (this.velocity > this.maxVelocity) {
            this.velocity = this.maxVelocity;
        }
    }
}
export default Sand;