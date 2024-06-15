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

    constructor(index: number) {
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

    setColor(newColor: number[]) {
        this.color = newColor;
        Fire.currentColor = newColor;
    }

    setProbability(newProbability: number): void {
        this.probability = newProbability;
        Fire.currentProbability = newProbability;
    }

    setLife(newLife: number) {
        const burningBehaviour: Burning = <Burning>this.behavioursLookup['Burning'];
        burningBehaviour.life = newLife;
        Fire.currentLife = newLife;
    }

    setReduction(newReduction: number) {
        const burningBehaviour: Burning = <Burning>this.behavioursLookup['Burning'];
        burningBehaviour.reduction = newReduction;
        Fire.currentReduction = newReduction;
    }

    setChanceToSpread(newChanceToSpread: number) {
        const burningBehaviour: Burning = <Burning>this.behavioursLookup['Burning'];
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
export default Fire;