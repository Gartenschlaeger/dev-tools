import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormService } from 'src/app/modules/form/services/form-service.service';
import { PageService } from '../../utilities/page-service';

export class UrlEncoderFormModel {
    sourceValue: string = '';
    encodeAsQueryString: boolean = false;
}

export interface UrlEncoderResultModel {
    processedValue: string;
    hasErrors: boolean;
}

const FormDefaults = new UrlEncoderFormModel();

@Component({
    selector: 'app-url-encoder',
    templateUrl: './url-encoder.component.html'
})
export class URLEncoderComponent implements OnInit {
    form!: UntypedFormGroup;
    isEncodeMode!: boolean;
    pageTitle!: string;
    result?: UrlEncoderResultModel;

    constructor(
        route: ActivatedRoute,
        private fb: UntypedFormBuilder,
        private formService: FormService,
        private pageService: PageService
    ) {
        const isEncodeMode = route.snapshot.url[0].path === 'url-encoder';

        this.isEncodeMode = isEncodeMode;
        this.pageTitle = isEncodeMode ? 'URL Encoder' : 'URL Decoder';
    }

    ngOnInit() {
        this.form = this.defineForm();

        this.pageService.setPageTitle(this.pageTitle);
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
