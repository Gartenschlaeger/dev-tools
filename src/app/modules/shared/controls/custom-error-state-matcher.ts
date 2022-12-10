import { AbstractControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

/**
 * Used by angular material to mark controls only as invalid in case they are already touched.
 */
export class CustomErrorStateMatcher implements ErrorStateMatcher {
    public isErrorState(control: AbstractControl | null, form: FormGroupDirective | NgForm | null): boolean {
        if (control && control.touched && control.invalid) {
            return true;
        }

        return false;
    }
}
