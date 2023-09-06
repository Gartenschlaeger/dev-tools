import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { FormService } from 'src/app/modules/shared/services/form-service.service';
import { DecHexConverterModel } from '../../entities/dec-hex-converter.model';

const FormDefaults = new DecHexConverterModel();

@Component({
    selector: 'app-dec-hex-converter',
    templateUrl: './dec-hex-converter.component.html'
})
export class DecHexConverterComponent {
    form!: UntypedFormGroup;
    result?: string;

    constructor(private fb: UntypedFormBuilder, private formService: FormService) {}

    ngOnInit() {
        this.form = this.defineForm();
    }

    defineForm(): UntypedFormGroup {
        return this.fb.group({
            decValue: [FormDefaults.decValue, [Validators.required]]
        });
    }

    handleConvert() {
        if (this.formService.validate(this.form)) {
            const model: DecHexConverterModel = this.form.value;
            const number = parseInt(model.decValue ?? '');
            this.result = number.toString(16);
        }
    }
}
