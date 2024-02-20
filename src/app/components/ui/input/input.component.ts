import { Component, Input, forwardRef } from '@angular/core';
import { FormComponent } from '../form/form.component';
import {
  HelperDirective,
  IconDirective,
  InputDirective,
  LabelDirective,
  AddonDirective
} from '../form/directives';
import { InputSize, InputType } from '../form/form.properties';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [
    FormComponent,
    HelperDirective,
    IconDirective,
    InputDirective,
    LabelDirective,
    AddonDirective,
    CommonModule
  ],
  selector: 'app-input',
  templateUrl: './input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    }
  ]
})
export class InputComponent implements ControlValueAccessor {
  @Input() title = '';
  @Input() placeholder = '';
  @Input() type: InputType = 'text';
  @Input() disabled = false;
  @Input() size: InputSize = 'default';
  @Input() formControlName: string;
  @Input() parentForm: FormGroup;

  public value: string;

  get formField(): FormControl {
    return this.parentForm?.get(this.formControlName) as FormControl;
  }
  get errorMessage() {
    if (this.formField.errors && Object.keys(this.formField.errors).length) {
      return Object.keys(this.formField.errors)[0]
    }
    return ""
  }
  get isRequired() {
    // get validations from the formControl
    const control = this.parentForm.get(this.formControlName);
    if (control && control.validator) {
      const validator = control.validator({} as FormControl);
      if (validator && validator?.["required"]) {
        return true;
      }
    }
    return false
  }
  get showErrors() {
    if (!this.formField.valid && this.formField.touched) return true
    return false;
  }
  get validationClass(): any {
    return this.showErrors ? 'error' : '';
  }

  public changed: (value: string) => void;
  public touched: () => void;
  public onChange(event: Event): void {
    const value: string = (event.target as HTMLInputElement).value;
    this.touched();
    this.changed(value);
  }

  writeValue(obj: any): void {
    this.value = obj;
  }
  registerOnChange(fn: any): void {
    this.changed = fn;
  }
  registerOnTouched(fn: any): void {
    this.touched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
