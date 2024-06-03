import Element from './element.js';
import { randomColor } from '../utils.js';

class Custom extends Element {
    constructor(index) {
        super(index, {
            color: randomColor([180, 150, 255])
        });
    }

    toString() {
        return 'C';
    }
}

export default Custom;