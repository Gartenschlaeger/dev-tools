import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormService } from '../../../modules/shared/services/form-service.service';

interface UnixTimestampConverterResultsModel {
    utcDate: string;
    localDate: string;
}

@Component({
    selector: 'app-unix-timestamp',
    templateUrl: './unix-timestamp.component.html'
})
export class UnixTimestampComponent {

    form = new FormGroup({
        timestamp: new FormControl<number | null>(null, {
            validators: [Validators.required]
        })
    });

    result?: UnixTimestampConverterResultsModel;

    constructor(private formService: FormService) {
    }

    private getUnixTimestamp(): number {
        const date = new Date();
        const milliseconds = date.getTime();

        return milliseconds / 1000 | 0;
    }

    public handleSetCurrentTimestamp() {
        this.form.patchValue({
            timestamp: this.getUnixTimestamp()
        });

        this.handleSubmit();
    }

    public handleSubmit() {
        if (this.formService.validate(this.form)) {
            const timestamp = this.form.value.timestamp!;

            const date = new Date();
            date.setTime(timestamp * 1000);

            this.result = {
                utcDate: date.toUTCString(),
                localDate: date.toLocaleString()
            };
        }
    }

    public handleReset() {
        this.formService.reset(this.form, { timestamp: null });
        this.result = undefined;
    }

}
