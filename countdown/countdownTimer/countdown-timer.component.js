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
var WORDS = {
    DAY: 'day',
    DAYS: 'days',
    HOUR: 'hour',
    HOURS: 'hours',
    MINUTE: 'minute',
    MINUTES: 'minutes',
    SECOND: 'second',
    SECONDS: 'seconds'
};
var CountdownTimerComponent = (function () {
    function CountdownTimerComponent(ref) {
        this.ref = ref;
    }
    CountdownTimerComponent.prototype.ngOnInit = function () {
        this.timerValueElement = this.ref.nativeElement.querySelector('.item-value');
        this.render({
            timeRange: this.lastTimeRange
        });
    };
    CountdownTimerComponent.prototype.render = function (data) {
        var str = '';
        var range = this.lastTimeRange = data.timeRange;
        if (!this.timerValueElement || !range) {
            return;
        }
        if (range.days > 0) {
            str += range.days + ' ' + (range.days > 1 ? WORDS.DAYS : WORDS.DAY);
        }
        if (str.length > 0 || range.hours > 0) {
            str += (str.length ? ' ' : '') + range.hours + ' ' + (range.hours > 1 ? WORDS.HOURS : WORDS.HOUR);
        }
        if (str.length > 0 || range.minutes > 0) {
            str += (str.length ? ' ' : '') + range.minutes + ' ' + (range.minutes > 1 ? WORDS.MINUTES : WORDS.MINUTE);
        }
        if (str.length > 0 || range.seconds > 0) {
            str += (str.length ? ' ' : '') + range.seconds + ' ' + (range.seconds > 1 ? WORDS.SECONDS : WORDS.SECOND);
        }
        this.timerValueElement.textContent = str;
    };
    CountdownTimerComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'countdown-timer',
            templateUrl: 'countdown-timer.component.html'
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], CountdownTimerComponent);
    return CountdownTimerComponent;
}());
exports.CountdownTimerComponent = CountdownTimerComponent;
//# sourceMappingURL=countdown-timer.component.js.map