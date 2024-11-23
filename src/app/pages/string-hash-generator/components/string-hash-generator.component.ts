import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { FormService } from '../../../modules/shared/services/form-service.service';
import { StringHashGeneratorFormModel } from '../entities/string-hash-generator-form.model';

export type StringHashAlgorithm = 'md5' | 'md5hmac' | 'sha1';

@Component({
    selector: 'app-string-hash-generator',
    templateUrl: './string-hash-generator.component.html',
    standalone: false
})
export class StringHashGeneratorComponent implements OnInit {
    form!: UntypedFormGroup;
    algorithm: StringHashAlgorithm | null = null;
    hashedString: string | null = null;
    error: string | null = null;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private fb: UntypedFormBuilder,
        private formService: FormService
    ) {}

    ngOnInit() {
        const path = this.route.snapshot.parent?.url[0].path;

        this.setupForm(path);

        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                const path = this.route.snapshot.parent?.url[0].path;
                this.setupForm(path);
            }
        });
    }

    private setupForm(path: string | undefined) {
        this.algorithm = this.getAlgorithmByPath(path);
        this.form = this.defineForm();
        this.handleReset();
    }

    private getAlgorithmByPath(path: string | undefined): StringHashAlgorithm {
        switch (path) {
            case 'md5-hash':
                return 'md5';
            case 'md5-hmac-hash':
                return 'md5hmac';
            case 'sha1-hash':
                return 'sha1';
        }

        throw new Error(`Unknown url path ${path}`);
    }

    private defineForm(): UntypedFormGroup {
        const form = this.fb.group({
            inputText: ['', [Validators.required]]
        });

        if (this.algorithm === 'md5hmac') {
            form.addControl('key', new UntypedFormControl('', [Validators.required]));
        }

        form.valueChanges.subscribe(() => this.handleValueChanged());

        return form;
    }

    handleValueChanged() {
        if (this.form.valid) {
            const model: StringHashGeneratorFormModel = this.form.value;

            if (model.inputText) {
                try {
                    switch (this.algorithm) {
                        case 'md5':
                            this.hashedString = CryptoJS.MD5(model.inputText).toString();
                            break;
                        case 'md5hmac':
                            this.hashedString = CryptoJS.HmacMD5(model.inputText, model.key).toString();
                            break;
                        case 'sha1':
                            this.hashedString = CryptoJS.SHA1(model.inputText).toString();
                            break;
                    }

                    this.error = null;
                } catch (err: any) {
                    this.error = `Error while hashing string : "${err?.message ?? err}"`;
                }
            }
        }
    }

    handleReset() {
        this.hashedString = null;
        this.error = null;
        this.formService.reset(this.form);
    }

    handleSubmit() {
        this.handleValueChanged();
    }
}
