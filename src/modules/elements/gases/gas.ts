import Element from '../element.js';
import Behaviour from '../../behaviours/Behaviour.js';

class Gas extends Element {
    constructor(index: number, { behaviours = <Behaviour[]>[] } = {}) {
        super(index, { behaviours });
        this.gas = true;
    }
}
export default Gas;