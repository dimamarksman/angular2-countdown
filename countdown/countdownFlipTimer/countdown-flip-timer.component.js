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
var CountdownFlipTimerComponent = (function () {
    function CountdownFlipTimerComponent(ref) {
        this.ref = ref;
    }
    CountdownFlipTimerComponent.prototype.ngOnInit = function () {
        this.daysElement = this.ref.nativeElement.querySelector('.days');
        this.hoursElement = this.ref.nativeElement.querySelector('.hours');
        this.minutesElement = this.ref.nativeElement.querySelector('.minutes');
        this.secondsElement = this.ref.nativeElement.querySelector('.seconds');
        this.render({
            timeRange: this.lastTimeRange
        });
    };
    CountdownFlipTimerComponent.prototype.render = function (data) {
        var range = this.lastTimeRange = data.timeRange;
        if (!range) {
            return;
        }
        if (range.days >= 0) {
            this.move(this.daysElement, range.days);
        }
        if (range.hours >= 0) {
            this.move(this.hoursElement, range.hours);
        }
        if (range.minutes >= 0) {
            this.move(this.minutesElement, range.minutes);
        }
        if (range.seconds >= 0) {
            this.move(this.secondsElement, range.seconds);
        }
    };
    CountdownFlipTimerComponent.prototype.move = function (list, nextValue) {
        var numberString = nextValue.toString();
        if (!list || list.getAttribute('flipTimerValue') === numberString) {
            return;
        }
        var items = list.children, currentList = [].filter.call(items, function (item) {
            return item.classList.contains('active');
        }), nextList = [].filter.call(items, function (item) {
            return !item.classList.contains('active');
        });
        nextList.forEach(function (nextItem) {
            [].forEach.call(nextItem.querySelectorAll('.inn'), function (element) {
                element.textContent = numberString;
            });
        });
        [].forEach.call(items, function (item) {
            item.classList.remove('active');
            item.classList.remove('before');
        });
        currentList.forEach(function (item) {
            item.classList.remove('active');
            item.classList.add('before');
        });
        nextList.forEach(function (item) {
            item.classList.add('active');
        });
        list.classList.add('play');
        list.setAttribute('flipTimerValue', numberString);
    };
    CountdownFlipTimerComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'countdown-flip-timer',
            templateUrl: 'countdown-flip-timer.component.html',
            styleUrls: ['countdown-flip-timer.component.css']
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], CountdownFlipTimerComponent);
    return CountdownFlipTimerComponent;
}());
exports.CountdownFlipTimerComponent = CountdownFlipTimerComponent;
//# sourceMappingURL=countdown-flip-timer.component.js.map