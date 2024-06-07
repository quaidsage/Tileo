import Element from '../element.js';
import { randomColor } from '../../utils.js';
import Burning from '../../behaviours/Burning.js';

class Fire extends Element {
    static defaultColor = [255, 130, 50];
    static defaultProbability = 0.1;
    static defaultLife = 50;
    static defaultReduction = 2;
    static defaultChanceToSpread = 1;

    static currentColor = Fire.defaultColor;
    static currentProbability = Fire.defaultProbability;
    static currentLife = Fire.defaultLife;
    static currentReduction = Fire.defaultReduction;
    static currentChanceToSpread = Fire.defaultChanceToSpread;

    constructor(index) {
        super(index, {
            color: randomColor(Fire.currentColor),
            onFire: true,
            probability: Fire.currentProbability,
            behaviours: [
                new Burning({
                    life: Fire.currentLife,
                    reduction: Fire.currentReduction,
                    chanceToSpread: Fire.currentChanceToSpread,
                })
            ]
        });
    }

    setLife(newLife) {
        this.behavioursLookup['Burning'].life = newLife;
        Fire.currentLife = newLife;
    }

    setReduction(newReduction) {
        this.behavioursLookup['Burning'].reduction = newReduction;
        Fire.currentReduction = newReduction;
    }

    setChanceToSpread(newChanceToSpread) {
        this.behavioursLookup['Burning'].chanceToSpread = newChanceToSpread;
        Fire.currentChanceToSpread = newChanceToSpread;
    }

    resetDefaults() {
        super.resetDefaults();
        this.setLife(Fire.defaultLife);
        this.setReduction(Fire.defaultReduction);
        this.setChanceToSpread(Fire.defaultChanceToSpread);

    }

    toString() {
        return 'F';
    }
}
export default Fire;