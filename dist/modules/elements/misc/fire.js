var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import Element from '../element.js';
import { randomColor } from '../../utils.js';
import Burning from '../../behaviours/Burning.js';
var Fire = /** @class */ (function (_super) {
    __extends(Fire, _super);
    function Fire(index) {
        var _this = _super.call(this, index, {
            onFire: true,
            behaviours: [
                new Burning({
                    life: Fire.currentLife,
                    reduction: Fire.currentReduction,
                    chanceToSpread: Fire.currentChanceToSpread,
                })
            ]
        }) || this;
        _this.probability = Fire.currentProbability;
        _this.color = randomColor(Fire.currentColor);
        return _this;
    }
    Fire.prototype.setColor = function (newColor) {
        this.color = newColor;
        Fire.currentColor = newColor;
    };
    Fire.prototype.setProbability = function (newProbability) {
        this.probability = newProbability;
        Fire.currentProbability = newProbability;
    };
    Fire.prototype.setLife = function (newLife) {
        var burningBehaviour = this.behavioursLookup['Burning'];
        burningBehaviour.life = newLife;
        Fire.currentLife = newLife;
    };
    Fire.prototype.setReduction = function (newReduction) {
        var burningBehaviour = this.behavioursLookup['Burning'];
        burningBehaviour.reduction = newReduction;
        Fire.currentReduction = newReduction;
    };
    Fire.prototype.setChanceToSpread = function (newChanceToSpread) {
        var burningBehaviour = this.behavioursLookup['Burning'];
        burningBehaviour.chanceToSpread = newChanceToSpread;
        Fire.currentChanceToSpread = newChanceToSpread;
    };
    Fire.prototype.resetDefaults = function () {
        _super.prototype.resetDefaults.call(this);
        this.setLife(Fire.defaultLife);
        this.setReduction(Fire.defaultReduction);
        this.setChanceToSpread(Fire.defaultChanceToSpread);
    };
    Fire.prototype.toString = function () {
        return 'F';
    };
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
    return Fire;
}(Element));
export default Fire;
