import { Component, OnInit, ElementRef } from '@angular/core';

import { TimeRange } from '../time-range';
import { Render } from '../countdown-render';
import { OnRenderEvent } from '../countdown-render';

@Component({
  moduleId: module.id,
  selector: 'countdown-flip-timer',
  templateUrl: 'countdown-flip-timer.component.html',
  styleUrls: ['countdown-flip-timer.component.css']
})
export class CountdownFlipTimerComponent implements OnInit, Render {
  private daysElement: Element;
  private hoursElement: Element;
  private minutesElement: Element;
  private secondsElement: Element;
  private lastTimeRange: TimeRange;

  constructor(private ref: ElementRef) { }

  ngOnInit() {
    this.daysElement = this.ref.nativeElement.querySelector('.days');
    this.hoursElement = this.ref.nativeElement.querySelector('.hours');
    this.minutesElement = this.ref.nativeElement.querySelector('.minutes');
    this.secondsElement = this.ref.nativeElement.querySelector('.seconds');
    this.render({
      timeRange: this.lastTimeRange
    });
  }

  render(data: OnRenderEvent): void {
    let range = this.lastTimeRange = data.timeRange;

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
  }

  move(list: Element, nextValue: number) {
    let numberString = nextValue.toString();

    if (!list || list.getAttribute('flipTimerValue') === numberString) {
      return;
    }

    let items = list.children,
      currentList = [].filter.call(items, (item: Element) => {
        return item.classList.contains('active');
      }),
      nextList: Element[] = [].filter.call(items, (item: Element) => {
        return !item.classList.contains('active');
      });

    nextList.forEach((nextItem: Element) => {
      [].forEach.call(nextItem.querySelectorAll('.inn'), (element: Element) => {
        element.textContent = numberString;
      });
    });

    [].forEach.call(items, (item: Element) => {
      item.classList.remove('active');
      item.classList.remove('before');
    });

    currentList.forEach((item: Element) => {
      item.classList.remove('active');
      item.classList.add('before');
    });

    nextList.forEach((item: Element) => {
      item.classList.add('active');
    });

    list.classList.add('play');

    list.setAttribute('flipTimerValue', numberString);
  }
}
