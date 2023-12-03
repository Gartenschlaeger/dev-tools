import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SharedDialogsService } from 'src/app/components/shared-dialogs/services/shared-dialogs.service';
import { FormService } from '../../../modules/shared/services/form-service.service';

const formDefaults = {
    owner: {
        hasRead: true,
        hasWrite: true,
        hasExecute: false
    },
    group: {
        hasRead: false,
        hasWrite: false,
        hasExecute: false
    },
    other: {
        hasRead: false,
        hasWrite: false,
        hasExecute: false
    }
};

@Component({
    selector: 'app-chmod-calculator',
    templateUrl: './chmod-calculator.component.html',
    styleUrls: ['./chmod-calculator.component.scss']
})
export class ChmodCalculatorComponent implements OnInit {
    form = new FormGroup({
        owner: new FormGroup({
            hasRead: new FormControl<boolean>(formDefaults.owner.hasRead),
            hasWrite: new FormControl<boolean>(formDefaults.owner.hasWrite),
            hasExecute: new FormControl<boolean>(formDefaults.owner.hasExecute)
        }),
        group: new FormGroup({
            hasRead: new FormControl<boolean>(formDefaults.group.hasRead),
            hasWrite: new FormControl<boolean>(formDefaults.group.hasWrite),
            hasExecute: new FormControl<boolean>(formDefaults.group.hasExecute)
        }),
        other: new FormGroup({
            hasRead: new FormControl<boolean>(formDefaults.other.hasRead),
            hasWrite: new FormControl<boolean>(formDefaults.other.hasWrite),
            hasExecute: new FormControl<boolean>(formDefaults.other.hasExecute)
        })
    });

    chmod?: string;

    constructor(private _formService: FormService, private _sharedDialogs: SharedDialogsService) {}

    public ngOnInit() {
        this.handleValueChanges();
        this.form.valueChanges.subscribe(() => {
            this.handleValueChanges();
        });
    }

    private addChmodSegment(hasExecute: boolean, hasWrite: boolean, hasRead: boolean): string {
        let result = 0;
        if (hasExecute) {
            result += 1;
        }
        if (hasWrite) {
            result += 2;
        }
        if (hasRead) {
            result += 4;
        }

        return String(result);
    }

    private handleValueChanges() {
        const owner = this.form.value.owner!;
        const group = this.form.value.group!;
        const other = this.form.value.other!;

        let chmod = '';
        chmod += this.addChmodSegment(owner.hasExecute!, owner.hasWrite!, owner.hasRead!);
        chmod += this.addChmodSegment(group.hasExecute!, group.hasWrite!, group.hasRead!);
        chmod += this.addChmodSegment(other.hasExecute!, other.hasWrite!, other.hasRead!);

        this.chmod = chmod;
    }

    public handleReset() {
        this._formService.reset(this.form, formDefaults);
    }

    public handlePickValue() {
        this._sharedDialogs
            .openInputDialog({
                title: 'Pick value',
                value: this.chmod,
                format: /^[0-7]{3}$/
            })
            .subscribe((value) => {
                if (!value) {
                    return;
                }

                const newChmod = (value || '').split('').map(Number);
                this.form.setValue({
                    owner: {
                        hasRead: (newChmod[0] & 4) !== 0,
                        hasWrite: (newChmod[0] & 2) !== 0,
                        hasExecute: (newChmod[0] & 1) !== 0
                    },
                    group: {
                        hasRead: (newChmod[1] & 4) !== 0,
                        hasWrite: (newChmod[1] & 2) !== 0,
                        hasExecute: (newChmod[1] & 1) !== 0
                    },
                    other: {
                        hasRead: (newChmod[2] & 4) !== 0,
                        hasWrite: (newChmod[2] & 2) !== 0,
                        hasExecute: (newChmod[2] & 1) !== 0
                    }
                });
            });
    }
}
