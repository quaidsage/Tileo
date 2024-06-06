import Element from '../element.js';
import { randomColor } from '../../utils.js';
import Burning from '../../behaviours/Burning.js';

class Wood extends Element {
    constructor(index) {
        super(index, {
            color: randomColor([139, 69, 19]),
            behaviours: [
                new Burning({
                    life: 100,
                    reduction: 2,
                    chanceToSpread: 0.05,
                })
            ]
        });
        this.onFire = false;
    }

    toString() {
        return 'w';
    }
}
export default Wood;