class Element {
    constructor(index, { color, debugColor, empty, still, liquid, gas, onFire, probability, behaviours } = {}) {
        this.color = color ?? [255, 255, 255];
        this.debugColor = debugColor ?? [0, 255, 0];
        this.empty = empty ?? false;
        this.still = still ?? false;
        this.liquid = liquid ?? false;
        this.gas = gas ?? false;
        this.onFire = onFire ?? false;
        this.probability = probability ?? 1;
        this.behaviours = behaviours ?? [];
        this.behavioursLookup = Object.fromEntries(
            this.behaviours.map(
                (b) => [b.constructor.name, b]
            )
        );
    }

    update(grid, params) {
        this.behaviours.forEach(
            (b) => b.update(this, grid, params)
        );
    }

    getBehaviour(type) {
        return this.behavioursLookup[type.name];
    }
}
export default Element;