import Element from '../element.js';
class Solid extends Element {
    constructor(index, { behaviours = [] } = {}) {
        super(index, { solid: true, behaviours });
    }
}
export default Solid;
