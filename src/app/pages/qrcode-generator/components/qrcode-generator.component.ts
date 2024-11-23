import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { FormService } from '../../../modules/shared/services/form-service.service';
import { QrCodeGeneratorFormModel } from '../entities/qr-code-generator-form.model';

const FormDefaults = new QrCodeGeneratorFormModel();

@Component({
    selector: 'app-qr-code-generator',
    templateUrl: './qrcode-generator.component.html',
    standalone: false
})
export class QrCodeGeneratorComponent implements OnInit {
    form!: UntypedFormGroup;
    result?: QrCodeGeneratorFormModel;

    constructor(
        private fb: UntypedFormBuilder,
        private formService: FormService
    ) {}

    ngOnInit() {
        this.form = this.defineForm();
    }

    defineForm(): UntypedFormGroup {
        const form = this.fb.group({
            text: [FormDefaults.text, [Validators.required]],
            size: [FormDefaults.size, [Validators.min(100), Validators.max(999)]]
        });

        form.get('size')?.valueChanges.subscribe((value) => {
            this.form.get('size')?.setValue(value, { onlySelf: true, emitEvent: false, emitModelToViewChange: true });
        });

        return form;
    }

    handleReset() {
        this.formService.reset(this.form, FormDefaults);
        this.result = undefined;
    }

    handleSubmit() {
        if (this.formService.validate(this.form)) {
            this.result = { ...this.form.value };
        }
    }
}
