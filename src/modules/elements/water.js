import Element from './element.js';
import WaterMove from '../behaviours/WaterMove.js';

class Water extends Element {
    constructor(index) {
        super(index, {
            color: [50, 86, 183],
            liquid: true,
            probability: 0.5,
            behaviours: [
                new WaterMove({
                    maxSpeed: 3,
                    acceleration: 0.1,
                    dispersion: 5
                })
            ]
        });
    }

    toString() {
        return 'W';
    }
}
export default Water;
