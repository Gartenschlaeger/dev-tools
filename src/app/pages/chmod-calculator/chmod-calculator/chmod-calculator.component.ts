import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormService } from '../../../modules/shared/services/form-service.service';

const formDefaults = {
    owner: {
        hasRead: true,
        hasWrite: true,
        hasExecute: true
    },
    group: {
        hasRead: true,
        hasWrite: false,
        hasExecute: false
    },
    other: {
        hasRead: true,
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
    fileSystem?: string;

    constructor(private _formService: FormService) {
    }

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

    private addFileSystemSegment(hasExecute: boolean, hasWrite: boolean, hasRead: boolean): string {
        let result = '';
        result += hasRead ? 'r' : '-';
        result += hasWrite ? 'w' : '-';
        result += hasExecute ? 'x' : '-';

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

        let fileSystemPattern = '';
        fileSystemPattern += this.addFileSystemSegment(owner.hasExecute!, owner.hasWrite!, owner.hasRead!);
        fileSystemPattern += this.addFileSystemSegment(group.hasExecute!, group.hasWrite!, group.hasRead!);
        fileSystemPattern += this.addFileSystemSegment(other.hasExecute!, other.hasWrite!, other.hasRead!);

        this.chmod = chmod;
        this.fileSystem = fileSystemPattern;
    }

    public handleReset() {
        this._formService.reset(this.form, formDefaults);
    }
}
