import Element from '../element.js';

class Solid extends Element {
    constructor(index, { color, debugColor, onFire, probability, behaviours } = {}) {
        super(index, { color, debugColor, onFire, probability, behaviours });
        this.solid = true;
    }
}
export default Solid;