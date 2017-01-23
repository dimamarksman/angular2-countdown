import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CountdownService } from './countdown.service';
import { CountdownModelDirective } from './countdown-model.directive';
import { CountdownTimerComponent } from './countdownTimer/countdown-timer.component';
import { CountdownFlipTimerComponent } from './countdownFlipTimer/countdown-flip-timer.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CountdownModelDirective,
    CountdownTimerComponent,
    CountdownFlipTimerComponent
  ],
  providers: [
    CountdownService
  ],
  exports: [
    CountdownModelDirective,
    CountdownTimerComponent,
    CountdownFlipTimerComponent
  ],
})
export class CountdownModule { }
