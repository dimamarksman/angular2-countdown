import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  template: `
    <h1>Angular 2 Countdown Timer Example</h1>
    <div [countdownModel]="countdownTimeStr" (countdownOnElapse)="onElapse($event)">Test</div>
  `
})
export class AppComponent {
  countdownTimeStr = '00:00:12:10';

  onElapse():void {
    alert('Countdown is finished!');
  }
}
