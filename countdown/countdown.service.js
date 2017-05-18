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
var Observable_1 = require('rxjs/Observable');
var Subject_1 = require('rxjs/Subject');
// Observable class extensions
require('rxjs/add/observable/interval');
require('rxjs/add/observable/empty');
// Observable operators
require('rxjs/add/operator/multicast');
require('rxjs/add/operator/catch');
require('rxjs/add/operator/map');
var CountdownService = (function () {
    function CountdownService(zone) {
        var _this = this;
        this.zone = zone;
        this.timerInterval = 1001;
        this.countdownModelMap = new Map();
        this.timer = Observable_1.Observable
            .create(function (observer) {
            try {
                var id_1;
                zone.runOutsideAngular(function () {
                    _this.lastDate = Date.now();
                    id_1 = setInterval(function () {
                        observer.next(null);
                    }, _this.timerInterval);
                });
                return function () {
                    if (id_1) {
                        clearTimeout(id_1);
                    }
                };
            }
            catch (err) {
                observer.error(err); // delivers an error if it caught one
            }
        })
            .map(function () {
            var now = Date.now();
            var elapse = now - _this.lastDate;
            _this.lastDate = now;
            return {
                elapse: elapse,
                now: now
            };
        })
            .multicast(new Subject_1.Subject())
            .refCount()
            .catch(function (error) {
            console.error(error);
            return Observable_1.Observable.empty();
        });
    }
    CountdownService.prototype.convertDateRangeStringToMs = function (value) {
        var countdownTime = value.split(':').reverse(), ss = parseFloat(countdownTime[0]), mm = parseInt(countdownTime[1], 10), hh = parseInt(countdownTime[2], 10), dd = parseInt(countdownTime[3], 10), countdownRangeMs = 0;
        if (!isNaN(ss)) {
            countdownRangeMs += Math.floor(ss * 1000);
        }
        if (!isNaN(mm)) {
            countdownRangeMs += mm * 60 * 1000;
        }
        if (!isNaN(hh)) {
            countdownRangeMs += hh * 60 * 60 * 1000;
        }
        if (!isNaN(dd)) {
            countdownRangeMs += dd * 24 * 60 * 60 * 1000;
        }
        return countdownRangeMs;
    };
    CountdownService.prototype.getTimeRangeAsObject = function (t) {
        var days, hours, minutes, seconds, milliseconds;
        days = Math.floor(t / 86400000);
        t -= days * 86400000;
        hours = Math.floor(t / 3600000) % 24;
        t -= hours * 3600000;
        minutes = Math.floor(t / 60000) % 60;
        t -= minutes * 60000;
        seconds = Math.floor(t / 1000) % 60;
        t -= seconds * 1000;
        milliseconds = Math.floor(t);
        return {
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds,
            milliseconds: milliseconds
        };
    };
    CountdownService.prototype.convertDateRangeStringToTimeRangeObj = function (dateRangeStr) {
        var timeMs = this.convertDateRangeStringToMs(dateRangeStr);
        return this.getTimeRangeAsObject(timeMs);
    };
    CountdownService.prototype.isTimeRangeStringElapsed = function (timeRangeStr) {
        return (timeRangeStr || '') === '' || timeRangeStr === '00:00:00:00';
    };
    CountdownService.prototype.wrapTimeStr = function (t) {
        return t < 10 ? '0' + t : t + '';
    };
    CountdownService.prototype.registerCountdownModel = function (modelId, model) {
        return this.countdownModelMap.set(modelId, model);
    };
    CountdownService.prototype.unregisterCountdownModel = function (modelId) {
        return this.countdownModelMap.delete(modelId);
    };
    CountdownService.prototype.getCurrentTimeRangeByModelId = function (modelId) {
        var model = this.countdownModelMap.get(modelId);
        return model && model.getCurrentTimeRange();
    };
    CountdownService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [core_1.NgZone])
    ], CountdownService);
    return CountdownService;
}());
exports.CountdownService = CountdownService;
//# sourceMappingURL=countdown.service.js.map