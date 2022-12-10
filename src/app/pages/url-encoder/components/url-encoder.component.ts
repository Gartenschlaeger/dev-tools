import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { FormService } from '../../../modules/shared/services/form-service.service';
import { UrlEncoderFormModel } from '../entities/url-encoder-form-model';
import { UrlEncoderResultModel } from '../entities/url-encoder-result-model';

const FormDefaults = new UrlEncoderFormModel();

@Component({
    selector: 'app-url-encoder',
    templateUrl: './url-encoder.component.html'
})
export class URLEncoderComponent implements OnInit {
    form!: UntypedFormGroup;
    isEncodeMode!: boolean;
    result?: UrlEncoderResultModel;

    constructor(
        private fb: UntypedFormBuilder,
        private formService: FormService
    ) {
    }

    ngOnInit() {
        this.form = this.defineForm();
    }

    defineForm(): UntypedFormGroup {
        const result = this.fb.group({
            sourceValue: [FormDefaults.sourceValue, [Validators.required]]
        });

        if (this.isEncodeMode) {
            result.addControl('encodeAsQueryString', new UntypedFormControl(false));
        }

        return result;
    }

    handleSubmit() {
        if (this.formService.validate(this.form)) {
            const model: UrlEncoderFormModel = this.form.value;

            try {
                let processedValue: string;
                if (this.isEncodeMode) {
                    processedValue = model.encodeAsQueryString
                        ? encodeURIComponent(model.sourceValue)
                        : encodeURI(model.sourceValue);
                } else {
                    processedValue = decodeURIComponent(model.sourceValue);
                }

                this.result = {
                    processedValue,
                    hasErrors: false
                };
            } catch (error) {
                this.result = {
                    processedValue: '',
                    hasErrors: true
                };
            }
        }
    }

    handleReset() {
        this.result = undefined;
        this.formService.reset(this.form, FormDefaults);
    }
}