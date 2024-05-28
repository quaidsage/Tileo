import Element from './element.js';
import { randomColor } from '../utils.js';
import MoveDown from '../behaviours/MoveDown.js';

class Sand extends Element {
    constructor(index) {
        super(index, {
            color: randomColor([180, 150, 0]),
            probability: 0.2,
            behaviours: [
                new MoveDown({
                    maxSpeed: 5,
                    acceleration: 0.5,
                })
            ]
        });
    }
}
export default Sand;