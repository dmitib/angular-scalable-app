import { InputModule } from './input/input.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormFieldModule } from './form-field/form-field.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    InputModule,
    FormFieldModule
  ],
  exports: [
    InputModule,
    FormFieldModule
  ]
})
export class ControlsModule { }
