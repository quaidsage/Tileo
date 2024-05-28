import Element from './element.js';

class Empty extends Element {
    static baseColor = [0, 0, 0];
    constructor(index) {
        super(index, { empty: true });
    }
}
export default Empty;