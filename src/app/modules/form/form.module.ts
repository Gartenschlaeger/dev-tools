import { CommonModule } from '@angular/common'
import { ModuleWithProviders, NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { FormCheckboxComponent } from 'src/app/modules/form/components/form-checkbox/form-checkbox.component'
import { FormFieldErrorsComponent } from 'src/app/modules/form/components/form-field-errors/form-field-errors.component'
import { FormFooterComponent } from 'src/app/modules/form/components/form-footer/form-footer.component'
import { FormLabelComponent } from 'src/app/modules/form/components/form-label/form-label.component'
import { FormSectionComponent } from 'src/app/modules/form/components/form-section/form-section.component'
import { FormTextfieldComponent } from 'src/app/modules/form/components/form-textfield/form-textfield.component'
import { FormService } from 'src/app/modules/form/services/form-service.service'

@NgModule({
	declarations: [
		FormCheckboxComponent,
		FormFieldErrorsComponent,
		FormFooterComponent,
		FormLabelComponent,
		FormSectionComponent,
		FormTextfieldComponent
	],
	imports: [CommonModule, ReactiveFormsModule],
	exports: [
		FormCheckboxComponent,
		FormFieldErrorsComponent,
		FormFooterComponent,
		FormLabelComponent,
		FormSectionComponent,
		FormTextfieldComponent
	]
})
export class FormModule {
	static forRoot(): ModuleWithProviders<FormModule> {
		return {
			ngModule: FormModule,
			providers: [FormService]
		}
	}
}
