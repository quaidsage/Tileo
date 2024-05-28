import Element from './element.js';
import { randomColor } from '../utils.js';
import MoveDown from '../behaviours/MoveDown.js';

class Sand extends Element {
    constructor(index) {
        super(index, {
            color: randomColor([255, 255, 0]),
            probability: 0.6,
            behaviours: [
                new MoveDown({
                    maxSpeed: 5,
                    acceleration: 1,
                    velocity: 1
                })
            ]
        });
    }
}
export default Sand;