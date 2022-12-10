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
                const obj = JSON.parse(model.source);

                let res;
                if (model.minify || model.stringify) {
                    res = JSON.stringify(obj);
                } else {
                    res = JSON.stringify(obj, null, '  ');
                }

                if (model.stringify) {
                    res = JSON.stringify(res);
                }

                this.result = {
                    formattedValue: res,
                    hasErrors: false
                };
            } catch (err) {
                this.result = {
                    formattedValue: '',
                    hasErrors: true
                };
            }
        }
    }
}
