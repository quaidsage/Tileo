class Element {
    constructor(index, { solid = false, liquid = false, gas = false, onFire = false, behaviours = [] } = {}) {
        this.index = index;
        this.color = Element.currentColor;
        this.debugColor = [255, 255, 255];
        this.probability = Element.currentProbability;
        this.solid = solid;
        this.liquid = liquid;
        this.gas = gas;
        this.onFire = onFire;
        this.behaviours = behaviours;
        this.behavioursLookup = Object.fromEntries(this.behaviours.map((b) => [b.constructor.name, b]));
    }
    update(grid) {
        this.behaviours.forEach((b) => b.update(grid, this));
    }
    getBehaviour(type) {
        return this.behavioursLookup[type.name];
    }
    setColor(newColor) {
        throw new Error('Method not implemented.');
    }
    setProbability(newProbability) {
        throw new Error('Method not implemented.');
    }
    setLife(newLife) {
        throw new Error('Method not implemented.');
    }
    setReduction(arg0) {
        throw new Error('Method not implemented.');
    }
    setChanceToSpread(arg0) {
        throw new Error('Method not implemented.');
    }
    setMaxSpeed(arg0) {
        throw new Error('Method not implemented.');
    }
    setAcceleration(arg0) {
        throw new Error('Method not implemented.');
    }
    setDispersion(arg0) {
        throw new Error('Method not implemented.');
    }
    resetDefaults() {
        throw new Error('Method not implemented.');
    }
}
export default Element;
