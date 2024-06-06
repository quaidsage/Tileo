import Element from '../element.js';

class Gas extends Element {
    constructor(index, { color, debugColor, onFire, probability, behaviours } = {}) {
        super(index, { color, debugColor, onFire, probability, behaviours });
        this.gas = true;
    }
}
export default Gas;