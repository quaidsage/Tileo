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
import SolidMove from '../../behaviours/SolidMove.js';
var Sand = /** @class */ (function (_super) {
    __extends(Sand, _super);
    function Sand(index) {
        var _this = _super.call(this, index, {
            behaviours: [
                new SolidMove({
                    maxSpeed: Sand.currentMaxSpeed,
                    acceleration: Sand.currentAcceleration,
                })
            ]
        }) || this;
        _this.probability = Sand.currentProbability;
        _this.color = randomColor(Sand.currentColor);
        return _this;
    }
    Sand.prototype.setColor = function (newColor) {
        this.color = newColor;
        Sand.currentColor = newColor;
    };
    Sand.prototype.setProbability = function (newProbability) {
        this.probability = newProbability;
        Sand.currentProbability = newProbability;
    };
    Sand.prototype.setMaxSpeed = function (newMaxSpeed) {
        var solidMove = this.behavioursLookup['SolidMove'];
        solidMove.maxSpeed = newMaxSpeed;
        Sand.currentMaxSpeed = newMaxSpeed;
    };
    Sand.prototype.setAcceleration = function (newAcceleration) {
        var solidMove = this.behavioursLookup['SolidMove'];
        solidMove.acceleration = newAcceleration;
        Sand.currentAcceleration = newAcceleration;
    };
    Sand.prototype.resetDefaults = function () {
        _super.prototype.resetDefaults.call(this);
        this.setMaxSpeed(Sand.defaultMaxSpeed);
        this.setAcceleration(Sand.defaultAcceleration);
    };
    Sand.prototype.toString = function () {
        return 'S';
    };
    Sand.defaultColor = [160, 120, 0];
    Sand.defaultProbability = 0.1;
    Sand.defaultMaxSpeed = 3;
    Sand.defaultAcceleration = 0.1;
    Sand.currentColor = Sand.defaultColor;
    Sand.currentProbability = Sand.defaultProbability;
    Sand.currentMaxSpeed = Sand.defaultMaxSpeed;
    Sand.currentAcceleration = Sand.defaultAcceleration;
    return Sand;
}(Solid));
export default Sand;
