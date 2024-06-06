import Liquid from './liquid.js';
import WaterMove from '../../behaviours/WaterMove.js';
import { randomColor } from '../../utils.js';

class Water extends Liquid {
    constructor(index) {
        super(index, {
            color: [50, 86, 183],
            liquid: true,
            probability: 0.5,
            behaviours: [
                new WaterMove({
                    maxSpeed: 3,
                    acceleration: 0.1,
                    dispersion: 7
                })
            ]
        });
    }

    toString() {
        return 'W';
    }
}
export default Water;
