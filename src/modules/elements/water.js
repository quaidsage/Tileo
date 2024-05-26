import Element from './element.js';
import {grid} from '../renderer.js';

class Water extends Element {
    constructor() {
        super({
            color: [0,0,255], 
            still: false, 
            liquid: true, 
            probability: 0.5, 
            disperse: 4,
            maxVelocity: 50,
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
        let left = i - 1;
        let right = i + 1;
        let column = i % grid.col;

        if ((Math.ceil(bottom / grid.row) < grid.row - 1) && grid.isEmpty(bottom)) {
            this.falling = true;
            this.updateVelocity();
        } else {
            this.falling = false;
            this.velocity = 0;
        }

        if (this.falling) {
            for (let m = 0; m < this.velocity/10; m++) {
                if ((Math.ceil((bottom+grid.row) / grid.row) < grid.row - 1) && grid.isEmpty(bottom+grid.row)) {
                    bottom += grid.row;
                } else {
                    break;
                }
            }
            grid.swap(i, bottom);
        } else if (bottomLeft % grid.col < column && grid.isEmpty(bottomLeft)) {
            grid.swap(i, bottomLeft);
        } else if (bottomRight % grid.col > column && grid.isEmpty(bottomRight)) {
            grid.swap(i, bottomRight);
        } else if ((column > 0 && grid.isEmpty(left))) {
            for (let m = 0; m < this.disperse; m++) {
                if (column > m + 1 && grid.isEmpty(left-1)) {
                    left--;
                } else {
                    break;
                };
            }
            grid.swap(i, left);
        } else if (column < grid.col - 1 && grid.isEmpty(right)) {
            for (let m = 0; m < this.disperse; m++) {
                if (column < grid.col - m - 2 && grid.isEmpty(right+1)) {
                    right++;
                } else {
                    break;
                };
            }
            grid.swap(i, right);
        } 
    }
    updateVelocity() {
        this.velocity += this.acceleration;
        if (this.velocity > this.maxVelocity) {
            this.velocity = this.maxVelocity;
        }
    }
}
export default Water;
