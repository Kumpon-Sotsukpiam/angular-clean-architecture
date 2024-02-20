import { NgModule } from '@angular/core'
import { ButtonComponent } from './button/button.component';
import { FormComponent } from './form/form.component';
import { InputComponent } from './input/input.component';
import { IndicatorsComponent } from './indicators/indicators.component';
import {
  HelperDirective,
  IconDirective,
  InputDirective,
  LabelDirective,
  AddonDirective
} from './form/directives';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { BreadcrumbItemComponent } from './breadcrumb/breadcrumb-item.component';
import { ModalBodyComponent } from './modal/modal-body/modal-body.component';
import { ModalFooterComponent } from './modal/modal-footer/modal-footer.component';
import { ModalHeaderComponent } from './modal/modal-header/modal-header.component';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  imports: [
    ButtonComponent,
    FormComponent,
    InputComponent,
    AddonDirective,
    HelperDirective,
    IconDirective,
    InputDirective,
    LabelDirective,
    IndicatorsComponent,
    BreadcrumbComponent,
    BreadcrumbItemComponent,
    ModalBodyComponent,
    ModalFooterComponent,
    ModalHeaderComponent,
    ModalComponent
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
    LabelDirective,
    IndicatorsComponent,
    BreadcrumbComponent,
    BreadcrumbItemComponent,
    ModalBodyComponent,
    ModalFooterComponent,
    ModalHeaderComponent,
    ModalComponent
  ]
})
export class UIModule { }