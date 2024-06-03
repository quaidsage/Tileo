import Element from './element.js';
import MoveDown from '../behaviours/MoveDown.js';
import Life from '../behaviours/Life.js';
import { randomColor } from '../utils.js';

class Smoke extends Element {
    constructor(index) {
        super(index, {
            color: randomColor([48, 48, 48]),
            gas: true,
            probability: 0.3,
            behaviours: [
                new MoveDown({
                    maxSpeed: 1,
                    acceleration: -1
                }),
                new Life({
                    life: 50,
                    reduction: 0.3
                })
            ]
        });
    }

    toString() {
        return 's';
    }
}
export default Smoke;