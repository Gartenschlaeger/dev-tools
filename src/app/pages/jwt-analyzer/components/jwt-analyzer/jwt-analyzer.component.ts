import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormService } from '../../../../modules/shared/services/form-service.service';

interface JwtAnalyzerResult {
    header: string;
    payload: string;
    signature: string;
}

@Component({
    selector: 'app-jwt-analyzer',
    templateUrl: './jwt-analyzer.component.html',
    styleUrls: ['./jwt-analyzer.component.scss']
})
export class JwtAnalyzerComponent {

    result?: JwtAnalyzerResult;
    errorMessage?: string;

    form = new FormGroup({
        jwt: new FormControl<string>('', {
            validators: [Validators.required]
        })
    });

    constructor(private _formService: FormService) {
    }

    decodeBase64(base64EncodedString: string): string {
        return atob(base64EncodedString);
    }

    formatJson(rawJson: string): string {
        return JSON.stringify(JSON.parse(rawJson), undefined, '  ');
    }

    handleSubmit() {
        if (this._formService.validate(this.form)) {
            const rawToken = this.form.value.jwt!;

            const tokenParts = rawToken?.split('.');
            if (tokenParts.length !== 3) {
                this.errorMessage = 'Invalid input';
                this.result = undefined;
                return;
            }

            try {
                this.errorMessage = undefined;
                this.result = {
                    header: this.formatJson(this.decodeBase64(tokenParts[0])),
                    payload: this.formatJson(this.decodeBase64(tokenParts[1])),
                    signature: ''
                };
            } catch (err) {
                this.result = undefined;
                if (err instanceof Error) {
                    this.errorMessage = err.message;
                } else {
                    this.errorMessage = 'Failed to analyze the token';
                }
            }
        }
    }

    handleReset() {
        this._formService.reset(this.form);
        this.result = undefined;
    }

}
