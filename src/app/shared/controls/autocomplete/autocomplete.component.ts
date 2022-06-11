import { ControlItem, Value } from '@app/models/frontend';
import { Component, EventEmitter, forwardRef, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { distinctUntilChanged, filter, map, Observable, startWith, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AutocompleteComponent),
      multi: true
    }
  ]
})
export class AutocompleteComponent implements OnInit, ControlValueAccessor, OnDestroy {
  @Input() items!: ControlItem[];
  @Input() placeholder!: string;

  @Output() changed = new EventEmitter<Value>();

  formControl = new FormControl();
  options$!: Observable<ControlItem[]>;

  private destroy = new Subject<any>();

  constructor() { }

  ngOnInit(): void {
    this.options$ = this.formControl.valueChanges.pipe(
      startWith(""),
      filter(value => typeof value === "string" || typeof value === "object"),
      map(value => typeof value === "string" ? value : value.label),
      map(label => label ? this.filter(label) : this.items.slice()),
    );

    this.formControl.valueChanges.pipe(
      takeUntil(this.destroy),
      distinctUntilChanged()
    ).subscribe(item => {
      const value = typeof item === "object" ? item.value : null;

      this.propogateChange(value);
      this.changed.emit(value);
    });
  }

  ngOnDestroy(): void {
    this.destroy.next({});
    this.destroy.complete();
  }

  private propogateChange: any = () => {};
  private propogateTouched: any = () => {};

  writeValue(value: Value): void {
    const selectedOption = this.items.find(item => item.value === value);

    this.formControl.setValue(selectedOption);
  }

  registerOnChange(fn: any): void {
    this.propogateChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.propogateTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.formControl.disable();
    } else {
      this.formControl.enable();
    }
  }

  private filter(value: string): ControlItem[] {
    const filterValue = value.toLowerCase();

    return this.items.filter(item => item.label.toLowerCase().includes(filterValue));
  }

  displayFn(item?: ControlItem): string {
    return item ? item.label : "";
  }

  onBlur(): void {
    this.propogateTouched();
  }

}
