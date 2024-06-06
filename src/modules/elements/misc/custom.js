import Element from '../element.js';
import { randomColor } from '../../utils.js';
import SolidMove from '../../behaviours/SolidMove.js';

class Custom extends Element {
    constructor(index) {
        super(index, {
            color: randomColor([180, 150, 255]),
            behaviours: [
                new SolidMove({
                    maxSpeed: 1,
                    acceleration: 0.1,
                })
            ]
        });
    }

    toString() {
        return 'C';
    }
}

export default Custom;