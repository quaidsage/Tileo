import Behaviour from "./Behaviour.js";
import { DEBUG_LIFE } from "../config.js";

class Life extends Behaviour {
    constructor({ life, reduction } = {}) {
        super();
        const variation = 1000 / life;
        const min = life - variation;
        const max = life + variation;
        this.life = Math.random() * (max - min) + min ?? 100;
        this.reduction = reduction ?? 1;
    }

    onDeath(element, grid) {
        grid.removeIndex(element.index);
        grid.highlightIndex.add(element.index);
    }

    update(element, grid) {
        if (DEBUG_LIFE) {
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
        element.color = element.color.map(colorComponent => colorComponent * lifePercentage);

        if (element.onFire) {
            grid.highlightIndex.add(element.index);
        }
    }
}

export default Life;