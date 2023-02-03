import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TextInputDialogOptions } from '../dialogs/TextInputDialogOptions';

@Component({
    selector: 'app-confirm-dialog',
    templateUrl: './confirm-dialog.component.html',
    styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {

    constructor(
        private dialogRef: MatDialogRef<ConfirmDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public options: TextInputDialogOptions) {
    }

    public handleOk() {
        this.dialogRef.close(true);
    }

    public handleCancel() {
        this.dialogRef.close(false);
    }
}
