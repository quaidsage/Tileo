import Element from './element.js';
import SolidMove from '../behaviours/SolidMove.js';

class Smoke extends Element {
    constructor(index) {
        super(index, {
            color: [48, 48, 48],
            probability: 0.3,
            behaviours: [
                new SolidMove({
                    maxSpeed: 5,
                    acceleration: -1
                })
            ]
        });
    }

    toString() {
        return 's';
    }
}
export default Smoke;