import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormFieldErrorsComponent } from './form-field-errors.component'

@NgModule({
    declarations: [FormFieldErrorsComponent],
    imports: [CommonModule],
    exports: [FormFieldErrorsComponent]
})
export class FormFieldErrorsModule {}
