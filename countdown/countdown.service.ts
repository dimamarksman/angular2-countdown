import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Observer } from 'rxjs/Observer';

// Observable class extensions
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/empty';

// Observable operators
import 'rxjs/add/operator/multicast';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { TimeRange } from './time-range';
import { CountdownEvent } from './countdown-event';

@Injectable()
export class CountdownService {
  private timerInterval = 1001;
  private lastDate: number;
  private countdownModelMap = new Map();

  timer: Observable<CountdownEvent>;

  constructor(private zone: NgZone) {
    this.timer = Observable
      .create((observer: Observer<null>) => {
        try {
          let id: any;

          zone.runOutsideAngular(() => {
            this.lastDate = Date.now();

            id = setInterval(() => {
              observer.next(null);
            }, this.timerInterval);
          });

          return function () {
            if (id) {
              clearTimeout(id);
            }
          };
        } catch (err) {
          observer.error(err); // delivers an error if it caught one
        }
      })
      .map(() => {
        let now = Date.now();
        let elapse = now - this.lastDate;
        this.lastDate = now;
        return {
          elapse: elapse,
          now: now
        };
      })
      .multicast(new Subject())
      .refCount()
      .catch((error: any) => {
        console.error(error);
        return Observable.empty();
      });
  }

  convertDateRangeStringToMs(value: string): number {
    let countdownTime = value.split(':').reverse(),
      ss = parseFloat(countdownTime[0]),
      mm = parseInt(countdownTime[1], 10),
      hh = parseInt(countdownTime[2], 10),
      dd = parseInt(countdownTime[3], 10),
      countdownRangeMs = 0;

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
  }

  getTimeRangeAsObject(t: number): TimeRange {
    let days: number,
      hours: number,
      minutes: number,
      seconds: number,
      milliseconds: number;

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
      days,
      hours,
      minutes,
      seconds,
      milliseconds
    };
  }

  convertDateRangeStringToTimeRangeObj(dateRangeStr: string): TimeRange {
    let timeMs = this.convertDateRangeStringToMs(dateRangeStr);
    return this.getTimeRangeAsObject(timeMs);
  }

  isTimeRangeStringElapsed(timeRangeStr: string): boolean {
    return (timeRangeStr || '') === '' || timeRangeStr === '00:00:00:00';
  }

  wrapTimeStr(t: number): string {
    return t < 10 ? '0' + t : t + '';
  }

  registerCountdownModel(modelId: string, model: any) {
    return this.countdownModelMap.set(modelId, model);
  }

  unregisterCountdownModel(modelId: string) {
    return this.countdownModelMap.delete(modelId);
  }

  getCurrentTimeRangeByModelId(modelId: string) {
    let model = this.countdownModelMap.get(modelId);
    return model && model.getCurrentTimeRange();
  }
}
