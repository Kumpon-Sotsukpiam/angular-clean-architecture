import { NgModule } from '@angular/core'
import { ButtonComponent } from './button/button.component';
import { FormComponent } from './form/form.component';
import { InputComponent } from './input/input.component';
import {
  HelperDirective,
  IconDirective,
  InputDirective,
  LabelDirective,
  AddonDirective
} from './form/directives';

@NgModule({
  imports: [
    ButtonComponent,
    FormComponent,
    InputComponent,
    AddonDirective,
    HelperDirective,
    IconDirective,
    InputDirective,
    LabelDirective
  ],
  providers: [
    AddonDirective,
    HelperDirective,
    IconDirective,
    InputDirective,
    LabelDirective
  ],
  exports: [
    ButtonComponent,
    FormComponent,
    InputComponent,
    AddonDirective,
    HelperDirective,
    IconDirective,
    InputDirective,
    LabelDirective
  ]
})
export class UIModule { }