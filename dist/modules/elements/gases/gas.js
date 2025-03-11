import Element from '../element.js';
class Gas extends Element {
    constructor(index, { behaviours = [] } = {}) {
        super(index, { behaviours });
        this.gas = true;
    }
}
export default Gas;
