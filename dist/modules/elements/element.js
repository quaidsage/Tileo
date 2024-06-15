var Element = /** @class */ (function () {
    function Element(index, _a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.solid, solid = _c === void 0 ? false : _c, _d = _b.liquid, liquid = _d === void 0 ? false : _d, _e = _b.gas, gas = _e === void 0 ? false : _e, _f = _b.onFire, onFire = _f === void 0 ? false : _f, _g = _b.behaviours, behaviours = _g === void 0 ? [] : _g;
        this.index = index;
        this.color = Element.currentColor;
        this.debugColor = [0, 0, 0];
        this.probability = Element.currentProbability;
        this.solid = solid;
        this.liquid = liquid;
        this.gas = gas;
        this.onFire = onFire;
        this.behaviours = behaviours;
        this.behavioursLookup = Object.fromEntries(this.behaviours.map(function (b) { return [b.constructor.name, b]; }));
    }
    Element.prototype.update = function (grid) {
        var _this = this;
        this.behaviours.forEach(function (b) { return b.update(grid, _this); });
    };
    Element.prototype.getBehaviour = function (type) {
        return this.behavioursLookup[type.name];
    };
    Element.prototype.setColor = function (newColor) {
        throw new Error('Method not implemented.');
    };
    Element.prototype.setProbability = function (newProbability) {
        throw new Error('Method not implemented.');
    };
    Element.prototype.setLife = function (newLife) {
        throw new Error('Method not implemented.');
    };
    Element.prototype.setReduction = function (arg0) {
        throw new Error('Method not implemented.');
    };
    Element.prototype.setChanceToSpread = function (arg0) {
        throw new Error('Method not implemented.');
    };
    Element.prototype.setMaxSpeed = function (arg0) {
        throw new Error('Method not implemented.');
    };
    Element.prototype.setAcceleration = function (arg0) {
        throw new Error('Method not implemented.');
    };
    Element.prototype.setDispersion = function (arg0) {
        throw new Error('Method not implemented.');
    };
    Element.prototype.resetDefaults = function () {
        throw new Error('Method not implemented.');
    };
    return Element;
}());
export default Element;
