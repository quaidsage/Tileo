class Element {
    constructor({color, empty, still, liquid, probability, disperse, velocity, acceleration, maxVelocity, falling} = {}) {
        this.color = color ?? [255,255,255];
        this.empty = empty ?? false;
        this.still = still;
        this.liquid = liquid;
        this.falling = falling ?? false;
        this.probability = probability ?? 1;
        this.disperse = disperse ?? 0;
        this.velocity = velocity ?? 0;
        this.acceleration = acceleration ?? 0;
        this.maxVelocity = maxVelocity ?? 0;
    }
    update() {}

    updateVelocity() {}
}
export default Element;