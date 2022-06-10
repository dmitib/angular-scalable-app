import { ControlItem } from './../../../models/frontend/control-item/index';
import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Value } from '@app/models/frontend';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    }
  ]
})
export class SelectComponent implements OnInit, ControlValueAccessor {
  @Input() items!: ControlItem[];
  @Input() placeholder!: string;

  @Output() changed = new EventEmitter<Value>();

  value!: string;
  isDisabled!: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  private propogateChange: any = () => {};
  private propogateTouched: any = () => {};

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.propogateChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.propogateTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  onBlur(): void {
    this.propogateTouched();
  }

  onChanged(event: MatSelectChange): void {
    const value = event.value ? event.value : null;

    this.value = value;
    this.propogateChange(value);
    this.changed.emit(value);
  }
}
