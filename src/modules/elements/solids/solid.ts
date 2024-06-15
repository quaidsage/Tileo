import Behaviour from '../../behaviours/Behaviour.js';
import Element from '../element.js';

class Solid extends Element {
    behaviours!: Behaviour[];
    constructor(index: number, { behaviours = <Behaviour[]>[] } = {}) {
        super(index, { solid: true, behaviours });
    }
}
export default Solid;