import { ControlItem } from './../../../../models/frontend/control-item/index';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { markFormGroupTouched, regex, regexErrors } from '@app/shared';

@Component({
  selector: 'app-shared',
  templateUrl: './shared.component.html',
  styleUrls: ['./shared.component.scss']
})
export class SharedComponent implements OnInit {
  form!: FormGroup;
  isInline!: boolean;
  regexErrors = regexErrors;

  items!: ControlItem[];

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.isInline = true;

    this.items = [
      { label: "First", value: 1 },
      { label: "Second", value: 2 },
      { label: "Third", value: 3 },
      { label: "Fourth", value: 4 },
      { label: "Fifth", value: 5 },
    ];

    this.form = this.fb.group({
      input: [null, {
        updateOn: "blur",
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern(regex.email)
          // Validators.pattern(regex.numbers)
        ]
      }],
      password: [null, {
        updateOn: "blur",
        validators: [Validators.required]
      }],
      autocomplete: [null, {
        updateOn: "blur",
        validators: [Validators.required]
      }],
      select: [null, {
        updateOn: "change",
        validators: [Validators.required]
      }],
      checkboxes: [null, {
        updateOn: "change",
        validators: [Validators.required]
      }],
      radios: [null, {
        updateOn: "change",
        validators: [Validators.required]
      }],
      date: [null, {
        updateOn: "change",
        validators: [Validators.required]
      }],
      dateRange: [null, {
        updateOn: "change",
        validators: [Validators.required]
      }]
    });
  }

  onPatchValue(): void {
    this.form.patchValue({
      input: 'test@test.ru',
      password: 'qwerty',
      autocomplete: 1,
      select: 2,
      checkboxes: [3],
      radios: 4,
      date: new Date().getTime(),
      dateRange: {
        from: new Date(2022, 6, 1).getTime(),
        to: new Date(2022, 6, 11).getTime()
      }
    });
  }

  onSubmit():void {
    if (!this.form.valid) {
      markFormGroupTouched(this.form);
    }
  }

  onToggleInline(): void {
    this.isInline = !this.isInline;
  }

  onToggleDisable(): void {
    if (this.form.enabled) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }
}
