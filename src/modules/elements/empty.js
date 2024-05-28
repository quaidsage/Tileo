import Element from './element.js';

class Empty extends Element {
    constructor(index) {
        super(index, { empty: true, color: [0, 0, 0] });
    }
}
export default Empty;