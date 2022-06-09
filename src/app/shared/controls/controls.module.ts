import { InputModule } from './input/input.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    InputModule
  ],
  exports: [
    InputModule
  ]
})
export class ControlsModule { }
