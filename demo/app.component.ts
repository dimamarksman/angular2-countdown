import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  template: `
    <h1>Angular 2 Countdown Timer Example</h1>
    <hr/>
    <h2>Simple Countdown Timer</h2>
    <countdown-timer #countdownTimer
      [countdownModel]="countdownTimeStr" 
      (countdownOnElapse)="onElapse($event)"
      (countdownOnRender)="countdownTimer.render($event)"></countdown-timer>
    <hr/>
    <h2>Flip Countdown Timer</h2>
    <countdown-flip-timer #countdownFlipTimer
      [countdownModel]="countdownFlipTimeStr" 
      (countdownOnElapse)="onElapse($event)"
      (countdownOnRender)="countdownFlipTimer.render($event)"></countdown-flip-timer>  
  `
})
export class AppComponent {
  countdownTimeStr = '01:12:07:13';
  countdownFlipTimeStr = '00:04:13:17';

  onElapse(): void {
    alert('Countdown is finished!');
  }

  onChange(value: any) {
    console.log(value);
  }
}
