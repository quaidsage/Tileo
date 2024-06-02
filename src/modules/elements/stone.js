import Element from './element.js';
import { randomColor } from '../utils.js';

class Stone extends Element {
    constructor(index) {
        super(index, { color: randomColor([100, 100, 100]) });
    }

    toString() {
        return 's';
    }
}
export default Stone;