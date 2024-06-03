import Element from './element.js';
import { randomColor } from '../utils.js';
import Burning from '../behaviours/Burning.js';

class Fire extends Element {
    constructor(index) {
        super(index, {
            color: randomColor([255, 130, 50]),
            onFire: true,
            probability: 0.1,
            behaviours: [
                new Burning({
                    life: 100,
                    reduction: 2,
                    chanceToSpread: 1
                })
            ]
        });
    }

    toString() {
        return 'F';
    }
}
export default Fire;