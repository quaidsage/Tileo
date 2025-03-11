import Element from '../element.js';
class Empty extends Element {
    constructor(index) {
        super(index);
        this.color = Empty.currentColor;
    }
    setColor(newColor) {
        this.color = newColor;
        Empty.currentColor = newColor;
    }
    setProbability(newProbability) {
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
Empty.defaultColor = [60, 100, 190];
Empty.defaultProbability = 1;
Empty.currentColor = Empty.defaultColor;
Empty.currentProbability = Empty.defaultProbability;
export default Empty;
