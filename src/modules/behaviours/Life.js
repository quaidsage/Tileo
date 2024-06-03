import Behaviour from "./Behaviour.js";
import { DEBUG_LIFE } from "../config.js";

let fadingVariation = 1.5;

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
        grid.removeIndex(element.index, element);
    }

    update(element, grid) {
        if (DEBUG_LIFE) {
            element.color = [150, this.life * 5, 0];
        }
        if (this.life <= 0) {
            this.onDeath(element, grid);
        }
        this.life = this.life - this.reduction;
        element.color = [element.color[0] - (this.reduction / fadingVariation), element.color[1] - (this.reduction / fadingVariation), element.color[2] - (this.reduction / fadingVariation)];
    }
}

export default Life;