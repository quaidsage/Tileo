import Element from '../element.js';

class Empty extends Element {
    static defaultColor = [60, 100, 190];
    static defaultProbability = 1;

    static currentColor = Empty.defaultColor;
    static currentProbability = Empty.defaultProbability;

    constructor(index: number) {
        super(index);
        this.color = Empty.currentColor;
    }

    setColor(newColor: number[]) {
        this.color = newColor;
        Empty.currentColor = newColor;
    }

    setProbability(newProbability: number): void {
        this.probability = newProbability;
        Empty.currentProbability = newProbability;
    }

    resetDefaults() {
        return;
    }

    toString() {
        return '_';
    }
}
export default Empty;