import Element from '../element.js';
import Behaviour from '../../behaviours/Behaviour.js';

class Liquid extends Element {
    constructor(index: number, { onFire = false, behaviours = <Behaviour[]>[] } = {}) {
        super(index, { onFire, behaviours });
        this.liquid = true;
    }
}
export default Liquid;