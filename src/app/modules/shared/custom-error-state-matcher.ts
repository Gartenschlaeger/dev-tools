import { AbstractControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class CustomErrorStateMatcher implements ErrorStateMatcher {
    public isErrorState(control: AbstractControl | null, form: FormGroupDirective | NgForm | null): boolean {
        if (control && control.touched && control.invalid) {
            return true;
        }

        return false;
    }
}
