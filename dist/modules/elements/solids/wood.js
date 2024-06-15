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
import Solid from './solid.js';
import { randomColor } from '../../utils.js';
import Burning from '../../behaviours/Burning.js';
var Wood = /** @class */ (function (_super) {
    __extends(Wood, _super);
    function Wood(index) {
        var _this = _super.call(this, index, {
            behaviours: [new Burning({
                    life: Wood.currentLife,
                    reduction: Wood.currentReduction,
                    chanceToSpread: Wood.currentChanceToSpread,
                })]
        }) || this;
        _this.probability = Wood.currentProbability;
        _this.color = randomColor(Wood.currentColor);
        return _this;
    }
    Wood.prototype.setColor = function (newColor) {
        this.color = newColor;
        Wood.currentColor = newColor;
    };
    Wood.prototype.setProbability = function (newProbability) {
        this.probability = newProbability;
        Wood.currentProbability = newProbability;
    };
    Wood.prototype.setLife = function (newLife) {
        var burningBehaviour = this.behavioursLookup['Burning'];
        burningBehaviour.life = newLife;
        Wood.currentLife = newLife;
    };
    Wood.prototype.setReduction = function (newReduction) {
        var burningBehaviour = this.behavioursLookup['Burning'];
        burningBehaviour.reduction = newReduction;
        Wood.currentReduction = newReduction;
    };
    Wood.prototype.setChanceToSpread = function (newChanceToSpread) {
        var burningBehaviour = this.behavioursLookup['Burning'];
        burningBehaviour.chanceToSpread = newChanceToSpread;
        Wood.currentChanceToSpread = newChanceToSpread;
    };
    Wood.prototype.resetDefaults = function () {
        _super.prototype.resetDefaults.call(this);
        this.setLife(Wood.defaultLife);
        this.setReduction(Wood.defaultReduction);
        this.setChanceToSpread(Wood.defaultChanceToSpread);
    };
    Wood.prototype.toString = function () {
        return 'w';
    };
    Wood.defaultColor = [68, 25, 9];
    Wood.defaultLife = 100;
    Wood.defaultReduction = 2;
    Wood.defaultChanceToSpread = 0.05;
    Wood.defaultProbability = 1;
    Wood.currentColor = Wood.defaultColor;
    Wood.currentLife = Wood.defaultLife;
    Wood.currentReduction = Wood.defaultReduction;
    Wood.currentChanceToSpread = Wood.defaultChanceToSpread;
    Wood.currentProbability = Wood.defaultProbability;
    return Wood;
}(Solid));
export default Wood;
