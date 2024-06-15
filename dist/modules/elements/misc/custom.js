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
import WaterMove from '../../behaviours/WaterMove.js';
var Custom = /** @class */ (function (_super) {
    __extends(Custom, _super);
    function Custom(index) {
        var _this = _super.call(this, index, {
            solid: true,
            behaviours: [
                new WaterMove({
                    maxSpeed: Custom.currentMaxSpeed,
                    acceleration: Custom.currentAcceleration,
                    dispersion: Custom.currentDispersion
                }),
                new Burning({
                    life: Custom.currentLife,
                    reduction: Custom.currentReduction,
                    chanceToSpread: Custom.currentChanceToSpread,
                })
            ]
        }) || this;
        _this.probability = Custom.currentProbability;
        _this.color = randomColor(Custom.currentColor);
        return _this;
    }
    Custom.prototype.setColor = function (newColor) {
        this.color = newColor;
        Custom.currentColor = newColor;
    };
    Custom.prototype.setProbability = function (newProbability) {
        this.probability = newProbability;
        Custom.currentProbability = newProbability;
    };
    Custom.prototype.setMaxSpeed = function (newMaxSpeed) {
        var waterMove = this.behavioursLookup['WaterMove'];
        waterMove.maxSpeed = newMaxSpeed;
        Custom.currentMaxSpeed = newMaxSpeed;
    };
    Custom.prototype.setAcceleration = function (newAcceleration) {
        var waterMove = this.behavioursLookup['WaterMove'];
        waterMove.acceleration = newAcceleration;
        Custom.currentAcceleration = newAcceleration;
    };
    Custom.prototype.setLife = function (newLife) {
        var burningBehaviour = this.behavioursLookup['Burning'];
        burningBehaviour.life = newLife;
        Custom.currentLife = newLife;
    };
    Custom.prototype.setReduction = function (newReduction) {
        var burningBehaviour = this.behavioursLookup['Burning'];
        burningBehaviour.reduction = newReduction;
        Custom.currentReduction = newReduction;
    };
    Custom.prototype.setChanceToSpread = function (newChanceToSpread) {
        var burningBehaviour = this.behavioursLookup['Burning'];
        burningBehaviour.chanceToSpread = newChanceToSpread;
        Custom.currentChanceToSpread = newChanceToSpread;
    };
    Custom.prototype.setDispersion = function (newDispersion) {
        var waterMove = this.behavioursLookup['WaterMove'];
        waterMove.dispersion = newDispersion;
        Custom.currentDispersion = newDispersion;
    };
    Custom.prototype.resetDefaults = function () {
        _super.prototype.resetDefaults.call(this);
        this.setMaxSpeed(Custom.defaultMaxSpeed);
        this.setAcceleration(Custom.defaultAcceleration);
        this.setLife(Custom.defaultLife);
        this.setReduction(Custom.defaultReduction);
        this.setChanceToSpread(Custom.defaultChanceToSpread);
        this.setDispersion(Custom.defaultDispersion);
    };
    Custom.prototype.toString = function () {
        return 'C';
    };
    Custom.defaultColor = [180, 150, 255];
    Custom.defaultProbability = 0.2;
    Custom.defaultMaxSpeed = 1;
    Custom.defaultAcceleration = 0.1;
    Custom.defaultLife = 200;
    Custom.defaultReduction = 2;
    Custom.defaultChanceToSpread = 0.1;
    Custom.defaultDispersion = 1;
    Custom.currentColor = Custom.defaultColor;
    Custom.currentProbability = Custom.defaultProbability;
    Custom.currentMaxSpeed = Custom.defaultMaxSpeed;
    Custom.currentAcceleration = Custom.defaultAcceleration;
    Custom.currentLife = Custom.defaultLife;
    Custom.currentReduction = Custom.defaultReduction;
    Custom.currentChanceToSpread = Custom.defaultChanceToSpread;
    Custom.currentDispersion = Custom.defaultDispersion;
    return Custom;
}(Element));
export default Custom;
