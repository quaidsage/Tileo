import Element from '../element.js';

class Empty extends Element {
    static defaultColor = [60, 100, 190];
    static defaultProbability = 1;

    static currentColor = Empty.defaultColor;
    static currentProbability = Empty.defaultProbability;

    constructor(index) {
        super(index, { empty: true, color: Empty.currentColor, debugColor: [0, 0, 0] });
    }

    resetDefaults() {
        return;
    }

    toString() {
        return '_';
    }
}
export default Empty;