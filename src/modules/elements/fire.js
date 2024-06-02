import Element from './element.js';
import { randomColor } from '../utils.js';

class Fire extends Element {
    constructor(index) {
        super(index, {
            color: randomColor([200, 80, 50]),
            probability: 0.1,
            behaviours: []
        });
    }

    toString() {
        return 'F';
    }
}
export default Fire;