import Solid from './solid.js';
import { randomColor } from '../../utils.js';

class Stone extends Solid {
    static defaultColor = [100, 100, 100];
    static defaultProbability = 1;

    static currentColor = Stone.defaultColor;
    static currentProbability = Stone.defaultProbability;

    constructor(index) {
        super(index, {
            color: randomColor(Stone.currentColor),
            probability: Stone.currentProbability
        });
    }

    toString() {
        return 's';
    }
}
export default Stone;