import Behaviour from "./Behaviour.js";
import { DebugOptions, DEBUG_MODE } from "../config.js";
class Life extends Behaviour {
    constructor({ life = 50, reduction = 1 } = {}) {
        super();
        const variation = 1000 / life;
        const min = life - variation;
        const max = life + variation;
        this.life = Math.random() * (max - min) + min;
        this.reduction = reduction !== null && reduction !== void 0 ? reduction : 1;
    }
    onDeath(element, grid) {
        grid.removeIndex(element.index);
        grid.highlightIndex.add(element.index);
    }
    update(grid, element) {
        if (DEBUG_MODE === DebugOptions.LIFE) {
            element.debugColor = [150, this.life * 5, 0];
        }
        if (this.life <= 0) {
            this.onDeath(element, grid);
            return;
        }
        this.life = this.life - this.reduction;
        // Calculate the percentage of life remaining
        const lifePercentage = this.life / (this.life + this.reduction);
        // Fade out the color based on the percentage of life remaining
        element.color = element.color.map((colorComponent) => colorComponent * lifePercentage);
        if (element.onFire) {
            grid.highlightIndex.add(element.index);
        }
    }
}
export default Life;
