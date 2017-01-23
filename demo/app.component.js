"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var AppComponent = (function () {
    function AppComponent() {
        this.countdownTimeStr = '01:12:07:13';
        this.countdownFlipTimeStr = '00:04:13:17';
    }
    AppComponent.prototype.onElapse = function () {
        alert('Countdown is finished!');
    };
    AppComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-app',
            template: "\n    <h1>Angular 2 Countdown Timer Example</h1>\n    <hr/>\n    <h2>Simple Countdown Timer</h2>\n    <countdown-timer #timer\n      [countdownModel]=\"countdownTimeStr\" \n      (countdownOnElapse)=\"onElapse($event)\"\n      (countdownOnRender)=\"timer.render($event)\"></countdown-timer>\n    <hr/>\n    <h2>Flip Countdown Timer</h2>\n    <countdown-flip-timer #flipTimer\n      [countdownModel]=\"countdownFlipTimeStr\" \n      (countdownOnElapse)=\"onElapse($event)\"\n      (countdownOnRender)=\"flipTimer.render($event)\"></countdown-flip-timer>  \n  "
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map