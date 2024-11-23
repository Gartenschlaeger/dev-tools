import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { FormService } from 'src/app/modules/shared/services/form-service.service';
import { HexDecConverterModel } from '../../entities/hex-dec-converter.model';

const FormDefaults = new HexDecConverterModel();

@Component({
    selector: 'app-hex-dec-converter',
    templateUrl: './hex-dec-converter.component.html',
    standalone: false
})
export class HexDecConverterComponent {
    form!: UntypedFormGroup;
    result?: number;

    constructor(
        private fb: UntypedFormBuilder,
        private formService: FormService
    ) {}

    ngOnInit() {
        this.form = this.defineForm();
    }

    defineForm(): UntypedFormGroup {
        return this.fb.group({
            hexValue: [FormDefaults.hexValue, [Validators.required]]
        });
    }

    handleConvert() {
        if (this.formService.validate(this.form)) {
            const model: HexDecConverterModel = this.form.value;
            this.result = parseInt(model.hexValue ?? '', 16);
        }
    }
}
