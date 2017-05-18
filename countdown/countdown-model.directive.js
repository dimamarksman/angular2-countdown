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
var countdown_service_1 = require('./countdown.service');
var CountdownModelDirective = (function () {
    function CountdownModelDirective(countdownService) {
        this.countdownService = countdownService;
        this.onChangeCountdownId = new core_1.EventEmitter();
        this.onRender = new core_1.EventEmitter();
        this.onElapse = new core_1.EventEmitter();
        this.id = Math.random().toString().slice(2);
        this.timeRangeObj = this.countdownService.getTimeRangeAsObject(0);
        // Expose model's id to parent component
        this.onChangeCountdownId.emit(this.id);
        // Register model in countdownService
        this.countdownService.registerCountdownModel(this.id, this);
    }
    Object.defineProperty(CountdownModelDirective.prototype, "countdownModel", {
        set: function (countdownModelValue) {
            if (countdownModelValue) {
                var value = this.countdownService.convertDateRangeStringToMs(countdownModelValue);
                if (typeof value !== 'number' || isNaN(value)) {
                    console.error('countdownTimer directive: parsing error.');
                    return;
                }
                this.timeRange = value;
                this.stopCounter();
                this.startCounter();
                this.preRender(this.timeRange);
            }
        },
        enumerable: true,
        configurable: true
    });
    CountdownModelDirective.prototype.ngOnDestroy = function () {
        this.countdownService.unregisterCountdownModel(this.id);
        this.stopCounter();
    };
    CountdownModelDirective.prototype.getCurrentTimeRange = function () {
        return this.timeRange;
    };
    CountdownModelDirective.prototype.startCounter = function () {
        this.timerSubscription = this.countdownService.timer.subscribe(this.tick.bind(this));
    };
    CountdownModelDirective.prototype.stopCounter = function () {
        if (this.timerSubscription) {
            this.timerSubscription.unsubscribe();
        }
    };
    CountdownModelDirective.prototype.tick = function (event) {
        this.timeRange = Math.max(this.timeRange - event.elapse, 0);
        this.preRender(this.timeRange);
        if (this.timeRange <= 0) {
            this.stopCounter();
            this.onElapse.emit();
        }
    };
    CountdownModelDirective.prototype.preRender = function (time) {
        this.timeRangeObj = this.countdownService.getTimeRangeAsObject(time);
        this.onRender.emit({
            timeRange: this.timeRangeObj,
            time: time
        });
    };
    __decorate([
        core_1.Input('countdownModel'), 
        __metadata('design:type', String), 
        __metadata('design:paramtypes', [String])
    ], CountdownModelDirective.prototype, "countdownModel", null);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], CountdownModelDirective.prototype, "onChangeCountdownId", void 0);
    __decorate([
        core_1.Output('countdownOnRender'), 
        __metadata('design:type', Object)
    ], CountdownModelDirective.prototype, "onRender", void 0);
    __decorate([
        core_1.Output('countdownOnElapse'), 
        __metadata('design:type', Object)
    ], CountdownModelDirective.prototype, "onElapse", void 0);
    CountdownModelDirective = __decorate([
        core_1.Directive({
            selector: '[countdownModel]',
            exportAs: 'countdownModel'
        }), 
        __metadata('design:paramtypes', [countdown_service_1.CountdownService])
    ], CountdownModelDirective);
    return CountdownModelDirective;
}());
exports.CountdownModelDirective = CountdownModelDirective;
//# sourceMappingURL=countdown-model.directive.js.map