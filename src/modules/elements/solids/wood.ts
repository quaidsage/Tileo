import Solid from './solid.js';
import { randomColor } from '../../utils.js';
import Burning from '../../behaviours/Burning.js';

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

    constructor(index: number) {
        super(index, {
            behaviours: [new Burning({
                life: Wood.currentLife,
                reduction: Wood.currentReduction,
                chanceToSpread: Wood.currentChanceToSpread,
            })]
        });
        this.probability = Wood.currentProbability
        this.color = randomColor(Wood.currentColor)
    }

    setColor(newColor: number[]) {
        this.color = newColor;
        Wood.currentColor = newColor;
    }

    setProbability(newProbability: number): void {
        this.probability = newProbability;
        Wood.currentProbability = newProbability;
    }

    setLife(newLife: number) {
        const burningBehaviour: Burning = <Burning>this.behavioursLookup['Burning'];
        burningBehaviour.life = newLife;
        Wood.currentLife = newLife;
    }

    setReduction(newReduction: number) {
        const burningBehaviour: Burning = <Burning>this.behavioursLookup['Burning'];
        burningBehaviour.reduction = newReduction;
        Wood.currentReduction = newReduction;
    }

    setChanceToSpread(newChanceToSpread: number) {
        const burningBehaviour: Burning = <Burning>this.behavioursLookup['Burning'];
        burningBehaviour.chanceToSpread = newChanceToSpread;
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