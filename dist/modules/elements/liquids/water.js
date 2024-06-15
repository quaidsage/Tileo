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
import Liquid from './liquid.js';
import WaterMove from '../../behaviours/WaterMove.js';
var Water = /** @class */ (function (_super) {
    __extends(Water, _super);
    function Water(index) {
        var _this = _super.call(this, index, {
            behaviours: [
                new WaterMove({
                    maxSpeed: Water.currentMaxSpeed,
                    acceleration: Water.currentAcceleration,
                    dispersion: Water.currentDispersion
                })
            ]
        }) || this;
        _this.probability = Water.currentProbability,
            _this.color = Water.currentColor;
        return _this;
    }
    Water.prototype.setColor = function (newColor) {
        this.color = newColor;
        Water.currentColor = newColor;
    };
    Water.prototype.setProbability = function (newProbability) {
        this.probability = newProbability;
        Water.currentProbability = newProbability;
    };
    Water.prototype.setMaxSpeed = function (newMaxSpeed) {
        var waterMove = this.behavioursLookup['WaterMove'];
        waterMove.maxSpeed = newMaxSpeed;
        Water.currentMaxSpeed = newMaxSpeed;
    };
    Water.prototype.setAcceleration = function (newAcceleration) {
        var waterMove = this.behavioursLookup['WaterMove'];
        waterMove.acceleration = newAcceleration;
        Water.currentAcceleration = newAcceleration;
    };
    Water.prototype.setDispersion = function (newDispersion) {
        var waterMove = this.behavioursLookup['WaterMove'];
        waterMove.dispersion = newDispersion;
        Water.currentDispersion = newDispersion;
    };
    Water.prototype.resetDefaults = function () {
        _super.prototype.resetDefaults.call(this);
        this.setMaxSpeed(Water.defaultMaxSpeed);
        this.setAcceleration(Water.defaultAcceleration);
        this.setDispersion(Water.defaultDispersion);
    };
    Water.prototype.toString = function () {
        return 'W';
    };
    Water.defaultColor = [50, 86, 183];
    Water.defaultProbability = 0.5;
    Water.defaultMaxSpeed = 3;
    Water.defaultAcceleration = 0.1;
    Water.defaultDispersion = 7;
    Water.currentColor = Water.defaultColor;
    Water.currentProbability = Water.defaultProbability;
    Water.currentMaxSpeed = Water.defaultMaxSpeed;
    Water.currentAcceleration = Water.defaultAcceleration;
    Water.currentDispersion = Water.defaultDispersion;
    return Water;
}(Liquid));
export default Water;
