import { Component, OnInit, ElementRef } from '@angular/core';

import { TimeRange } from '../time-range';
import { Render } from '../countdown-render';
import { OnRenderEvent } from '../countdown-render';

const WORDS = {
  DAY: 'day',
  DAYS: 'days',
  HOUR: 'hour',
  HOURS: 'hours',
  MINUTE: 'minute',
  MINUTES: 'minutes',
  SECOND: 'second',
  SECONDS: 'seconds'
};

@Component({
  moduleId: module.id,
  selector: 'countdown-timer',
  templateUrl: 'countdown-timer.component.html'
})
export class CountdownTimerComponent implements OnInit, Render {
  private timerValueElement: any;
  private lastTimeRange: TimeRange;

  constructor(private ref: ElementRef) { }

  ngOnInit() {
    this.timerValueElement = this.ref.nativeElement.querySelector('.item-value');
    this.render({
      timeRange: this.lastTimeRange
    });
  }

  render(data: OnRenderEvent): void {
    let str = '';
    let range = this.lastTimeRange = data.timeRange;

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
  }
}
