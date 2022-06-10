import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';

// type PasswordType = "password" | "text";

enum PasswordType {
  Password = "password",
  Text = "text"
}

enum PasswordState {
  Show = "show",
  Hide = "hide"
}

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PasswordComponent),
      multi: true
    }
  ]
})
export class PasswordComponent implements OnInit, ControlValueAccessor {
  @Input() placeholder!: string;

  @Output() changed = new EventEmitter<string>();

  value!: string;
  isDisabled!: boolean;
  passwordType: PasswordType = PasswordType.Password;
  PasswordType = PasswordType;
  PasswordState = PasswordState;

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

  onKeyup(event: any): void {
    const value = event.target.value;

    this.value = value;
    this.propogateChange(value);
    this.changed.emit(value);
  }

  onBlur(): void {
    this.propogateTouched();
  }

  togglePassword(): void {
    this.passwordType = this.passwordType === PasswordType.Password ? PasswordType.Text : PasswordType.Password;
  }
}
