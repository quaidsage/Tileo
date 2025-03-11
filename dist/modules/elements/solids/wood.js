import Solid from './solid.js';
import { randomColor } from '../../utils.js';
import Burning from '../../behaviours/Burning.js';
class Wood extends Solid {
    constructor(index) {
        super(index, {
            behaviours: [new Burning({
                    life: Wood.currentLife,
                    reduction: Wood.currentReduction,
                    chanceToSpread: Wood.currentChanceToSpread,
                })]
        });
        this.probability = Wood.currentProbability;
        this.color = randomColor(Wood.currentColor);
    }
    setColor(newColor) {
        this.color = newColor;
        Wood.currentColor = newColor;
    }
    setProbability(newProbability) {
        this.probability = newProbability;
        Wood.currentProbability = newProbability;
    }
    setLife(newLife) {
        const burningBehaviour = this.behavioursLookup['Burning'];
        burningBehaviour.life = newLife;
        Wood.currentLife = newLife;
    }
    setReduction(newReduction) {
        const burningBehaviour = this.behavioursLookup['Burning'];
        burningBehaviour.reduction = newReduction;
        Wood.currentReduction = newReduction;
    }
    setChanceToSpread(newChanceToSpread) {
        const burningBehaviour = this.behavioursLookup['Burning'];
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
Wood.defaultColor = [68, 25, 9];
Wood.defaultLife = 100;
Wood.defaultReduction = 2;
Wood.defaultChanceToSpread = 0.05;
Wood.defaultProbability = 1;
Wood.currentColor = Wood.defaultColor;
Wood.currentLife = Wood.defaultLife;
Wood.currentReduction = Wood.defaultReduction;
Wood.currentChanceToSpread = Wood.defaultChanceToSpread;
Wood.currentProbability = Wood.defaultProbability;
export default Wood;
