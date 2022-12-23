import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormService } from '../../../../modules/shared/services/form-service.service';

@Component({
    selector: 'app-jwt-analyzer',
    templateUrl: './jwt-analyzer.component.html',
    styleUrls: ['./jwt-analyzer.component.scss']
})
export class JwtAnalyzerComponent {

    form = new FormGroup({
        jwt: new FormControl<string>('', {
            validators: [Validators.required]
        })
    });

    constructor(private _formService: FormService) {
    }

    handleSubmit() {
        if (this._formService.validate(this.form)) {

        }
    }

    handleReset() {
        this._formService.reset(this.form);
    }

}
