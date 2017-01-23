import { Component } from '@angular/core';

import { CountdownService } from './countdown/countdown.service';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  template: `
    <h1>Angular 2 Countdown Timer Example</h1>
    <countdown-timer #timer
      [countdownModel]="countdownTimeStr" 
      (countdownOnElapse)="onElapse($event)"
      (countdownOnRender)="timer.render($event)"></countdown-timer>
    <hr/>
    <countdown-flip-timer #flipTimer
      [countdownModel]="countdownFlipTimeStr" 
      (countdownOnElapse)="onElapse($event)"
      (countdownOnRender)="flipTimer.render($event)"></countdown-flip-timer>  
  `
})
export class AppComponent {
  countdownTimeStr = '01:12:07:13';
  countdownFlipTimeStr = '00:00:13:17';

  constructor(private countdownService: CountdownService) { }

  onElapse(): void {
    alert('Countdown is finished!');
  }
}
