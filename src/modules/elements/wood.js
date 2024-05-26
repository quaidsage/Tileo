import Element from './element.js';
import {randomColor} from '../utils.js';

class Wood extends Element {
    constructor() {
        super({color: randomColor([139,69,19]), still: true, liquid: false});
    }
}
export default Wood;