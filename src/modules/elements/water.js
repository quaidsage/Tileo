import Element from './element.js';
import MoveDown from '../behaviours/MoveDown.js';

class Water extends Element {
    constructor(index) {
        super(index, {
            color: [0, 0, 255],
            liquid: true,
            probability: 0.5,
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
export default Water;
