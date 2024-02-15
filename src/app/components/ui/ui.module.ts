import { NgModule } from '@angular/core'
import { ButtonComponent } from './button/button.component'

@NgModule({
    imports: [ButtonComponent],
    providers: [],
    exports: [ButtonComponent]
})
export class UIModule { }