import { Component, ElementRef, ViewChild } from '@angular/core';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { FormService } from '../../../../modules/shared/services/form-service.service';

interface LinkBuilderQueryString {
    key: string;
    value: string;
}

interface LinkBuilderModel {
    protocol: 'http' | 'https';
    domain: string;
    queryStrings: LinkBuilderQueryString[];
}

const LinkBuilderQueryStringFormDefaults: LinkBuilderQueryString = {
    key: '',
    value: ''
};

const LinkBuilderFormDefaults: LinkBuilderModel = {
    protocol: 'https',
    domain: '',
    queryStrings: []
};

@Component({
    selector: 'app-link-builder',
    templateUrl: './link-builder.component.html',
    styleUrls: ['./link-builder.component.scss']
})
export class LinkBuilderComponent {

    formGroupMain: UntypedFormGroup;
    formGroupQueryString: UntypedFormGroup;
    queryStrings: UntypedFormArray;
    result: string | undefined = undefined;

    @ViewChild('queryStringKeyInput') queryStringKeyInput!: ElementRef<HTMLInputElement>;

    constructor(private formService: FormService, private fb: UntypedFormBuilder) {
        this.formGroupMain = this.defineMainFormGroup();
        this.formGroupMain.valueChanges.subscribe(() => {
            this.handleSubmit();
        });

        this.queryStrings = this.formGroupMain.get('queryStrings') as UntypedFormArray;

        this.formGroupQueryString = this.defineQueryStringFormGroup();
    }

    private defineMainFormGroup() {
        return this.fb.group({
            protocol: this.fb.control(LinkBuilderFormDefaults.protocol, {
                validators: [Validators.required]
            }),
            domain: this.fb.control(LinkBuilderFormDefaults.domain, {
                validators: [Validators.required]
            }),
            queryStrings: this.fb.array([])
        });
    }

    private defineQueryStringFormGroup() {
        return this.fb.group({
            key: this.fb.control(LinkBuilderQueryStringFormDefaults.key, {
                validators: [Validators.required]
            }),
            value: this.fb.control(LinkBuilderQueryStringFormDefaults.value, {
                validators: [Validators.required]
            })
        });
    }

    private createQueryStringFormGroup(key: string, value: string) {
        return this.fb.group({
            key: this.fb.control(key, {
                validators: [Validators.required]
            }),
            value: this.fb.control(value, {
                validators: [Validators.required]
            })
        });
    }

    public handleAddQueryString() {
        if (this.formService.validate(this.formGroupQueryString)) {
            const model: LinkBuilderQueryString = this.formGroupQueryString.value;

            const group = this.createQueryStringFormGroup(model.key, model.value);
            this.queryStrings.push(group);

            this.queryStringKeyInput.nativeElement.focus();
            this.formService.reset(this.formGroupQueryString, LinkBuilderQueryStringFormDefaults);
        }
    }

    public handleRemoveQueryString(index: number) {
        this.queryStrings.removeAt(index);
    }

    public handleSubmit() {
        if (this.formService.validate(this.formGroupMain)) {
            const model: LinkBuilderModel = this.formGroupMain.value;

            const urlBuilder = new URL(this.formGroupMain.value.protocol + '://' + this.formGroupMain.value.domain!);

            if (model.queryStrings) {
                for (let queryString of model.queryStrings) {
                    urlBuilder.searchParams.append(queryString.key, queryString.value);
                }
            }

            this.result = urlBuilder.toString();
        }
    }

    public handleReset() {
        this.formService.reset(this.formGroupMain, LinkBuilderFormDefaults);
        this.formService.reset(this.formGroupQueryString, LinkBuilderQueryStringFormDefaults);
        this.queryStrings.clear();
        this.result = undefined;
    }

}
