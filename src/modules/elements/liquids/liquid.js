import Element from '../element.js';

class Liquid extends Element {
    constructor(index, { color, debugColor, onFire, probability, behaviours } = {}) {
        super(index, { color, debugColor, onFire, probability, behaviours });
        this.liquid = true;
    }
}
export default Liquid;