import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormFieldErrorsModule } from 'src/app/shared/form-elements/form-field-errors/form-field-errors.module'
import { FormInputComponent } from 'src/app/shared/form-elements/form-input/form-input.component'

@NgModule({
    declarations: [FormInputComponent],
    imports: [CommonModule, FormFieldErrorsModule],
    exports: [FormInputComponent]
})
export class FormInputModule {}
