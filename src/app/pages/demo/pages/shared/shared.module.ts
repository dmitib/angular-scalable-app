import { IndicatorsModule } from './../../../../shared/indicators/indicators.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { SharedComponent } from './shared.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ControlsModule, ButtonsModule } from '@app/shared';


@NgModule({
  declarations: [
    SharedComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    ButtonsModule,
    FormsModule,
    ReactiveFormsModule,
    ControlsModule,
    IndicatorsModule
  ]
})
export class SharedModule { }
