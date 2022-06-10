import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormGroup, FormBuilder } from '@angular/forms';

export interface Value {
  from: number;
  to: number;
}

export interface Placeholder {
  from: number;
  to: number;
}

@Component({
  selector: 'app-date-range',
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateRangeComponent),
      multi: true
    }
  ]
})
export class DateRangeComponent implements OnInit, ControlValueAccessor {
  @Input() placeholder!: Placeholder;

  @Output() changed = new EventEmitter<Value>();

  form!: FormGroup;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      from: [null],
      to: [null]
    });
  }

  get min(): Date | null {
    const from = this.form.controls['from'].value;

    return from ? new Date(from) : null;
  }

  get max(): Date | null {
    const to = this.form.controls['to'].value;

    return to ? new Date(to) : null;
  }

  private propogateChange: any = () => {};
  private propogateTouched: any = () => {};

  writeValue(value: Value): void {
    this.form.patchValue(value || {});
  }

  registerOnChange(fn: any): void {
    this.propogateChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.propogateTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  onChanged(): void {
    const value = { ...this.form.value };

    this.propogateChange(value);
    this.changed.emit(value);
  }

  onClosed(): void {
    this.propogateTouched();
  }
}
