import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TextInputDialogOptions } from './TextInputDialogOptions';

interface InputTextDialogModel {
    value: string;
}

@Component({
    selector: 'app-text-input-dialog',
    templateUrl: './text-input-dialog.component.html'
})
export class TextInputDialogComponent {

    public form: FormGroup;

    constructor(private fb: FormBuilder,
                private dialogRef: MatDialogRef<TextInputDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public options: TextInputDialogOptions) {

        this.form = this.defineFormGroup();
    }

    private defineFormGroup(): FormGroup {
        return this.fb.group({
            value: [this.options.value, [Validators.required, Validators.pattern(this.options.format || '.+')]]
        });
    }

    handleCancel() {
        this.dialogRef.close(null);
    }

    handleOk() {
        if (this.form.valid) {
            const model: InputTextDialogModel = this.form.value;
            this.dialogRef.close(model.value);
        }
    }

}
