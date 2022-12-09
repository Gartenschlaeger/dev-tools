import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import * as jsonpath from 'jsonpath';
import { FormService } from '../../modules/shared/services/form-service.service';
import { PageService } from '../../utilities/page-service';

class JsonPathFormModule {
    json: string = '';
    path: string = '';
}

class JsonPathResult {
    result?: string;
    error?: string;
}

const FormDefaults = new JsonPathFormModule();

@Component({
    selector: 'app-json-path',
    templateUrl: './json-path.component.html'
})
export class JsonPathComponent implements OnInit {
    form!: UntypedFormGroup;
    result: JsonPathResult | null = null;

    constructor(private fb: UntypedFormBuilder, private formService: FormService, private pageService: PageService) {
    }

    ngOnInit() {
        this.form = this.defineForm();

        this.pageService.setPageTitle('JSON Path');
    }

    defineForm(): UntypedFormGroup {
        return this.fb.group({
            json: [FormDefaults.json, [Validators.required]],
            path: [FormDefaults.path, [Validators.required]]
        });
    }

    handleReset() {
        this.formService.reset(this.form, FormDefaults);
        this.result = null;
    }

    handleSubmit() {
        if (this.formService.validate(this.form)) {
            const model: JsonPathFormModule = this.form.value;

            let tmp = new JsonPathResult();

            let inputObj: any;
            try {
                inputObj = JSON.parse(model.json!);
            } catch (err: any) {
                tmp.error = 'Error while parsing the input JSON : "\n' + err?.message + '"';
            }

            let pathResult: any;
            try {
                pathResult = jsonpath.query(inputObj, model.path!);
            } catch (err: any) {
                tmp.error = 'Error while evaluating the path query : "\n' + err.message + '"';
            }

            tmp.result = JSON.stringify(pathResult, null, '  ');

            this.result = tmp;
        }
    }
}
