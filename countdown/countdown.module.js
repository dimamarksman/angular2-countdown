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
var common_1 = require('@angular/common');
var countdown_service_1 = require('./countdown.service');
var countdown_model_directive_1 = require('./countdown-model.directive');
var countdown_timer_component_1 = require('./countdownTimer/countdown-timer.component');
var countdown_flip_timer_component_1 = require('./countdownFlipTimer/countdown-flip-timer.component');
var CountdownModule = (function () {
    function CountdownModule() {
    }
    CountdownModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule
            ],
            declarations: [
                countdown_model_directive_1.CountdownModelDirective,
                countdown_timer_component_1.CountdownTimerComponent,
                countdown_flip_timer_component_1.CountdownFlipTimerComponent
            ],
            providers: [
                countdown_service_1.CountdownService
            ],
            exports: [
                countdown_model_directive_1.CountdownModelDirective,
                countdown_timer_component_1.CountdownTimerComponent,
                countdown_flip_timer_component_1.CountdownFlipTimerComponent
            ],
        }), 
        __metadata('design:paramtypes', [])
    ], CountdownModule);
    return CountdownModule;
}());
exports.CountdownModule = CountdownModule;
//# sourceMappingURL=countdown.module.js.map