import { NgModule } from '@angular/core';
import { CommonModule }       from '@angular/common';

import { CountdownService } from './countdown.service';
import { CountdownModelDirective } from './countdown-model.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    CountdownModelDirective
  ],
  declarations: [
    CountdownModelDirective
  ],
  providers: [
    CountdownService
  ]
})
export class CountdownModule { }