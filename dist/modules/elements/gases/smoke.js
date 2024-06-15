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
import Gas from './gas.js';
import GasMove from '../../behaviours/GasMove.js';
import Life from '../../behaviours/Life.js';
import { randomColor } from '../../utils.js';
var Smoke = /** @class */ (function (_super) {
    __extends(Smoke, _super);
    function Smoke(index) {
        var _this = _super.call(this, index, {
            behaviours: [
                new GasMove({
                    maxSpeed: Smoke.currentMaxSpeed,
                    acceleration: Smoke.currentAcceleration,
                    dispersion: Smoke.currentDispersion
                }),
                new Life({
                    life: Smoke.currentLife,
                    reduction: Smoke.currentReduction
                })
            ]
        }) || this;
        _this.probability = Smoke.currentProbability;
        _this.color = randomColor(Smoke.currentColor);
        return _this;
    }
    Smoke.prototype.setColor = function (newColor) {
        this.color = newColor;
        Smoke.currentColor = newColor;
    };
    Smoke.prototype.setProbability = function (newProbability) {
        this.probability = newProbability;
        Smoke.currentProbability = newProbability;
    };
    Smoke.prototype.setMaxSpeed = function (newMaxSpeed) {
        var waterMove = this.behavioursLookup['GasMove'];
        waterMove.maxSpeed = newMaxSpeed;
        Smoke.currentMaxSpeed = newMaxSpeed;
    };
    Smoke.prototype.setAcceleration = function (newAcceleration) {
        var waterMove = this.behavioursLookup['GasMove'];
        waterMove.acceleration = newAcceleration;
        Smoke.currentAcceleration = newAcceleration;
    };
    Smoke.prototype.setLife = function (newLife) {
        var burningBehaviour = this.behavioursLookup['Life'];
        burningBehaviour.life = newLife;
        Smoke.currentLife = newLife;
    };
    Smoke.prototype.setReduction = function (newReduction) {
        var burningBehaviour = this.behavioursLookup['Life'];
        burningBehaviour.reduction = newReduction;
        Smoke.currentReduction = newReduction;
    };
    Smoke.prototype.setDispersion = function (newDispersion) {
        var waterMove = this.behavioursLookup['GasMove'];
        waterMove.dispersion = newDispersion;
        Smoke.currentDispersion = newDispersion;
    };
    Smoke.prototype.resetDefaults = function () {
        _super.prototype.resetDefaults.call(this);
        this.setLife(Smoke.defaultLife);
        this.setReduction(Smoke.defaultReduction);
        this.setMaxSpeed(Smoke.defaultMaxSpeed);
        this.setAcceleration(Smoke.defaultAcceleration);
        this.setDispersion(Smoke.defaultDispersion);
    };
    Smoke.prototype.toString = function () {
        return 's';
    };
    Smoke.defaultColor = [48, 48, 48];
    Smoke.defaultProbability = 0.3;
    Smoke.defaultLife = 50;
    Smoke.defaultReduction = 1;
    Smoke.defaultMaxSpeed = 1;
    Smoke.defaultAcceleration = 0.1;
    Smoke.defaultDispersion = 2;
    Smoke.currentColor = Smoke.defaultColor;
    Smoke.currentProbability = Smoke.defaultProbability;
    Smoke.currentLife = Smoke.defaultLife;
    Smoke.currentReduction = Smoke.defaultReduction;
    Smoke.currentMaxSpeed = Smoke.defaultMaxSpeed;
    Smoke.currentAcceleration = Smoke.defaultAcceleration;
    Smoke.currentDispersion = Smoke.defaultDispersion;
    return Smoke;
}(Gas));
export default Smoke;
