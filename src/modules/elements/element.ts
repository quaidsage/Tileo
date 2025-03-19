import Behaviour from "../behaviours/Behaviour.js";
import Grid from "../grid.js";

class Element {
    index!: number;
    color!: number[];
    debugColor!: number[];
    previousDebugColor!: number[];
    probability!: number;
    solid!: boolean;
    liquid!: boolean;
    gas!: boolean;
    onFire!: boolean;
    behaviours!: Behaviour[];
    behavioursLookup!: { [key: string]: Behaviour };

    static defaultColor: number[];
    static defaultProbability: number;
    static currentColor: number[];
    static currentProbability: number;

    constructor(index: number, { solid = false, liquid = false, gas = false, onFire = false, behaviours = <Behaviour[]>[] } = {}) {
        this.index = index;
        this.color = Element.currentColor;
        this.debugColor = [255, 255, 255];
        this.previousDebugColor = [255, 255, 255];
        this.probability = Element.currentProbability;
        this.solid = solid;
        this.liquid = liquid;
        this.gas = gas;
        this.onFire = onFire;
        this.behaviours = behaviours;
        this.behavioursLookup = Object.fromEntries(
            this.behaviours.map(
                (b) => [b.constructor.name, b]
            )
        );
    }

    update(grid: Grid) {
        this.behaviours.forEach(
            (b) => b.update(grid, this)
        );
    }

    getBehaviour(type: typeof Behaviour) {
        return this.behavioursLookup[type.name];
    }

    setColor(newColor: number[]) {
        throw new Error('Method not implemented.');
    }

    setProbability(newProbability: number) {
        throw new Error('Method not implemented.');
    }

    setLife(newLife: number) {
        throw new Error('Method not implemented.');
    }

    setReduction(arg0: number) {
        throw new Error('Method not implemented.');
    }
    setChanceToSpread(arg0: number) {
        throw new Error('Method not implemented.');
    }
    setMaxSpeed(arg0: number) {
        throw new Error('Method not implemented.');
    }
    setAcceleration(arg0: number) {
        throw new Error('Method not implemented.');
    }
    setDispersion(arg0: number) {
        throw new Error('Method not implemented.');
    }

    resetDefaults() {
        throw new Error('Method not implemented.');
    }
}
export default Element;