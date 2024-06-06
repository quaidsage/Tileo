import Element from '../element.js';
import { randomColor } from '../../utils.js';
import SolidMove from '../../behaviours/SolidMove.js';

class Sand extends Element {
    constructor(index) {
        super(index, {
            // 180, 150, 255 - Ally's color
            color: randomColor([160, 120, 0]),
            probability: 0.2,
            behaviours: [
                new SolidMove({
                    maxSpeed: 3,
                    acceleration: 0.1
                })
            ]
        });
    }

    toString() {
        return 'S';
    }
}
export default Sand;