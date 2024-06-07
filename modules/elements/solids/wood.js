import Solid from './solid.js';
import { randomColor } from '../../utils.js';
import Burning from '../../behaviours/Burning.js';
import { updateOnNextFrame } from '../../renderer.js';

class Wood extends Solid {
    static defaultColor = [68, 25, 9];
    static defaultLife = 100;
    static defaultReduction = 2;
    static defaultChanceToSpread = 0.05;
    static defaultProbability = 1;

    static currentColor = Wood.defaultColor;
    static currentLife = Wood.defaultLife;
    static currentReduction = Wood.defaultReduction;
    static currentChanceToSpread = Wood.defaultChanceToSpread;
    static currentProbability = Wood.defaultProbability;

    constructor(index) {
        super(index, {
            color: randomColor(Wood.currentColor),
            probability: Wood.currentProbability,
            behaviours: [new Burning({
                life: Wood.currentLife,
                reduction: Wood.currentReduction,
                chanceToSpread: Wood.currentChanceToSpread,
            })]
        });
        this.onFire = false;
    }

    setLife(newLife) {
        this.behavioursLookup['Burning'].life = newLife;
        Wood.currentLife = newLife;
    }

    setReduction(newReduction) {
        this.behavioursLookup['Burning'].reduction = newReduction;
        Wood.currentReduction = newReduction;
    }

    setChanceToSpread(newChanceToSpread) {
        this.behavioursLookup['Burning'].chanceToSpread = newChanceToSpread;
        Wood.currentChanceToSpread = newChanceToSpread;
    }

    resetDefaults() {
        super.resetDefaults();
        this.setLife(Wood.defaultLife);
        this.setReduction(Wood.defaultReduction);
        this.setChanceToSpread(Wood.defaultChanceToSpread);
    }

    toString() {
        return 'w';
    }
}
export default Wood;