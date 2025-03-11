import Element from '../element.js';
import { randomColor } from '../../utils.js';
import Burning from '../../behaviours/Burning.js';
class Fire extends Element {
    constructor(index) {
        super(index, {
            onFire: true,
            behaviours: [
                new Burning({
                    life: Fire.currentLife,
                    reduction: Fire.currentReduction,
                    chanceToSpread: Fire.currentChanceToSpread,
                })
            ]
        });
        this.probability = Fire.currentProbability;
        this.color = randomColor(Fire.currentColor);
    }
    setColor(newColor) {
        this.color = newColor;
        Fire.currentColor = newColor;
    }
    setProbability(newProbability) {
        this.probability = newProbability;
        Fire.currentProbability = newProbability;
    }
    setLife(newLife) {
        const burningBehaviour = this.behavioursLookup['Burning'];
        burningBehaviour.life = newLife;
        Fire.currentLife = newLife;
    }
    setReduction(newReduction) {
        const burningBehaviour = this.behavioursLookup['Burning'];
        burningBehaviour.reduction = newReduction;
        Fire.currentReduction = newReduction;
    }
    setChanceToSpread(newChanceToSpread) {
        const burningBehaviour = this.behavioursLookup['Burning'];
        burningBehaviour.chanceToSpread = newChanceToSpread;
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
Fire.defaultColor = [255, 130, 50];
Fire.defaultProbability = 0.1;
Fire.defaultLife = 50;
Fire.defaultReduction = 2;
Fire.defaultChanceToSpread = 1;
Fire.currentColor = Fire.defaultColor;
Fire.currentProbability = Fire.defaultProbability;
Fire.currentLife = Fire.defaultLife;
Fire.currentReduction = Fire.defaultReduction;
Fire.currentChanceToSpread = Fire.defaultChanceToSpread;
export default Fire;
