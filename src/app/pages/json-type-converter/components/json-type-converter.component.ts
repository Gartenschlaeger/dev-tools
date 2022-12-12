import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormService } from '../../../modules/shared/services/form-service.service';
import { JsonTransformService } from '../services/json-transform.service';

interface ResultModel {
    result?: string;
    errorMessage?: string;
}

@Component({
    selector: 'app-json-type-converter',
    templateUrl: './json-type-converter.component.html',
    styleUrls: ['./json-type-converter.component.scss']
})
export class JsonTypeConverterComponent {

    result?: ResultModel;

    form = new FormGroup({
        jsonText: new FormControl<string | null>(null, {
            validators: [Validators.required]
        })
    });

    constructor(private _formService: FormService,
                private _jsonTransformService: JsonTransformService) {
    }

    handleSubmit() {
        if (this._formService.validate(this.form)) {
            const json = this.form.value.jsonText!;

            let convertedJson: string | undefined = undefined;
            let errorMessage: string | undefined = undefined;

            try {
                convertedJson = this._jsonTransformService.convert(json);
            } catch (err) {
                if (err instanceof Error) {
                    errorMessage = err.message;
                } else {
                    errorMessage = 'Something went wrong';
                }
            }

            this.result = {
                result: convertedJson,
                errorMessage: errorMessage
            };
        }
    }

    handleReset() {
        this._formService.reset(this.form);
        this.result = undefined;
    }

}
