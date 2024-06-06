import Element from '../element.js';

class Empty extends Element {
    constructor(index) {
        super(index, { empty: true, color: [0, 0, 0], debugColor: [0, 0, 0] });
    }

    toString() {
        return '_';
    }
}
export default Empty;