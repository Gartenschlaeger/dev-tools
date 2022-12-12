import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { FormService } from '../../../modules/shared/services/form-service.service';
import { JsonFormatterFormModel } from '../entities/json-formatter-form.model';
import { JsonFormatterResultModel } from '../entities/json-formatter-result.model';

const FormDefaults = new JsonFormatterFormModel();

@Component({
    selector: 'app-json-formatter',
    templateUrl: './json-formatter.component.html'
})
export class JsonFormatterComponent implements OnInit {
    form!: UntypedFormGroup;
    result?: JsonFormatterResultModel;

    constructor(private fb: UntypedFormBuilder, private formService: FormService) {
    }

    ngOnInit() {
        this.form = this.defineForm();

        // if source was passed by another page immediately start formatting
        const model: JsonFormatterFormModel = this.form.value;
        if (model.source) {
            this.handleSubmit();
        }
    }

    defineForm(): UntypedFormGroup {
        const source = (history.state.source as string) || FormDefaults.source;
        return this.fb.group({
            source: [source, [Validators.required]],
            minify: [FormDefaults.minify],
            stringify: [FormDefaults.stringify]
        });
    }

    handleReset() {
        this.formService.reset(this.form, FormDefaults);
        this.result = undefined;
    }

    handleSubmit() {
        if (this.formService.validate(this.form)) {
            const model = this.form.value;

            try {
                let parsedValue = JSON.parse(model.source);
                if (typeof parsedValue !== 'object') {
                    parsedValue = JSON.parse(parsedValue);
                }

                let res;
                if (model.minify || model.stringify) {
                    res = JSON.stringify(parsedValue);
                } else {
                    res = JSON.stringify(parsedValue, null, '  ');
                }

                if (model.stringify) {
                    res = JSON.stringify(res);
                }

                this.result = {
                    formattedValue: res,
                    error: undefined
                };
            } catch (err) {
                this.result = {
                    formattedValue: '',
                    error: 'Failed to format JSON'
                };

                if (err instanceof Error) {
                    console.log(err.message);
                    this.result.error = err.message;
                }
            }
        }
    }
}
