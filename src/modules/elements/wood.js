import Element from './element.js';
import { randomColor } from '../utils.js';

class Wood extends Element {
    constructor(index) {
        super(index, { color: randomColor([139, 69, 19]) });
    }
}
export default Wood;