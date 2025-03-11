import Element from '../element.js';
class Liquid extends Element {
    constructor(index, { onFire = false, behaviours = [] } = {}) {
        super(index, { onFire, behaviours });
        this.liquid = true;
    }
}
export default Liquid;
