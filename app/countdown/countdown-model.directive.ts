import { Directive, OnInit, OnDestroy, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { Observer } from 'rxjs/Observer';
import { Subscription } from 'rxjs/Subscription';

import { TimeRange } from './time-range';
import { CountdownEvent } from './countdown-event';
import { CountdownService } from './countdown.service';

@Directive({
  selector: '[countdownModel]'
})
export class CountdownModelDirective implements OnInit, OnDestroy {
  private _countdownModel: string;
  private timeRange: number;
  private timerSubscription: Subscription;
  private id: string;

  timeRangeObj: TimeRange;

  @Input('countdownModel') set countdownModel(countdownModelValue: string) {
    if (countdownModelValue) {
      let value = this.countdownService.convertDateRangeStringToMs(countdownModelValue);

      if (typeof value != 'number' || isNaN(value)) {
        console.error('countdownTimer directive: parsing error.');
        return;
      }

      this.timeRange = value;

      this.stopCounter();

      this.startCounter();

      this.preRender(this.timeRange);
    }
  }

  @Output() onChanageCountdownId = new EventEmitter<string>();

  @Output('countdownOnElapse') onElapse = new EventEmitter<void>();

  constructor(private countdownService: CountdownService) {
    this.id = Math.random().toString().slice(2);
    this.timeRangeObj = this.countdownService.getTimeRangeAsObject(0);

    // Expose model's id to parent component
    this.onChanageCountdownId.emit(this.id);

    // Register model in countdownService
    this.countdownService.registerCountdownModel(this.id, this);
  }

  ngOnInit(): void {
    //
  }

  ngOnDestroy(): void {
    this.countdownService.unregisterCountdownModel(this.id);
    this.stopCounter();
  }

  render(timeRangeObj: TimeRange, timeRange: number): void {
    // Called when the view needs to be updated. 
    // It is expected that the user of the countdown-model
    // directive will implement this method.
    console.log(timeRangeObj);
  }

  getCurrentTimeRange() {
    return this.timeRange;
  }

  startCounter(): void {
    this.timerSubscription = this.countdownService.timer.subscribe(this.tick.bind(this));
  }

  stopCounter(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  tick(event: CountdownEvent): void {
    this.timeRange = Math.max(this.timeRange - event.elapse, 0);

    this.preRender(this.timeRange);

    if (this.timeRange <= 0) {
      this.stopCounter();
      this.onElapse.emit();
    }
  }

  preRender(timeRange: number): void {
    this.timeRangeObj = this.countdownService.getTimeRangeAsObject(timeRange);
    this.render(this.timeRangeObj, timeRange);
  }
}
