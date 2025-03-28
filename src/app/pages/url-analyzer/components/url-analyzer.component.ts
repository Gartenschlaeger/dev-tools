import { Component, OnInit, signal } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { NavigationBehaviorOptions, Router } from '@angular/router';
import { FormService } from '../../../modules/shared/services/form-service.service';
import { UrlAnalyzerModel } from '../entities/url-analyzer.model';
import { UrlAnalyzerResult } from '../entities/url-analyzer.result';

const UrlAnalyzerFormDefaults = new UrlAnalyzerModel();

@Component({
    selector: 'app-url-analyzer-page',
    templateUrl: './url-analyzer.component.html',
    standalone: false
})
export class UrlAnalyzerComponent implements OnInit {
    form!: UntypedFormGroup;
    result: UrlAnalyzerResult | null = null;
    hasError = false;
    showQueryDetails = false;
    editInUrlBuilderIsDisabled = signal(true);

    constructor(
        public formService: FormService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.form = this.defineFormGroup();
    }

    defineFormGroup(): UntypedFormGroup {
        return new UntypedFormGroup({
            url: new UntypedFormControl(UrlAnalyzerFormDefaults.url, {
                validators: [Validators.required]
            })
        });
    }

    handleSubmit() {
        if (this.formService.validate(this.form)) {
            try {
                const model: UrlAnalyzerModel = this.form.value;

                let urlToParse = model.url;
                if (!urlToParse.toLowerCase().startsWith('http')) {
                    urlToParse = 'https://' + urlToParse;
                }

                const url = new URL(urlToParse);

                this.result = new UrlAnalyzerResult();
                this.result.hostname = url.hostname;
                this.result.port = url.port;
                this.result.path = url.pathname;
                this.result.fragment = url.hash;

                if (url.search) {
                    this.result.queryString = url.search.substring(1);
                }

                if (this.result.queryStringValues) {
                    url.searchParams.forEach((val, key) => {
                        this.result?.queryStringValues.push({
                            name: key,
                            value: val
                        });
                    });
                }

                this.editInUrlBuilderIsDisabled.set(false);
                this.hasError = false;
            } catch (err) {
                console.error(err);
                this.result = null;
                this.editInUrlBuilderIsDisabled.set(true);
                this.hasError = true;
            }
        }
    }

    handleToogleSearchDetails() {
        this.showQueryDetails = !this.showQueryDetails;
    }

    handleReset() {
        this.formService.reset(this.form, UrlAnalyzerFormDefaults);
        this.editInUrlBuilderIsDisabled.set(true);
        this.result = null;
    }

    async handleEditInUrlBuilder() {
        if (this.result) {
            const options: NavigationBehaviorOptions = {
                state: { url: this.form.value.url }
            };

            await this.router.navigateByUrl('/url-builder', options);
        }
    }
}
