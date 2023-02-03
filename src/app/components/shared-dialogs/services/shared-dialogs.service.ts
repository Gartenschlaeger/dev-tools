import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { defaultIfEmpty, map, Observable } from 'rxjs';
import { ConfirmDialogOptions } from '../confirm-dialog/confirm-dialog-options';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { TextInputDialogOptions } from '../text-input-dialog/text-input-dialog-options';
import { TextInputDialogComponent } from '../text-input-dialog/text-input-dialog.component';

@Injectable({
    providedIn: 'root'
})
export class SharedDialogsService {

    constructor(private matDialog: MatDialog) {
    }

    public openInputDialog(options: TextInputDialogOptions): Observable<string | null | undefined> {
        return this.matDialog
            .open(TextInputDialogComponent, { data: options, minWidth: '520px' })
            .afterClosed();
    }

    public openConfirmDialog(options: ConfirmDialogOptions): Observable<boolean> {
        return this.matDialog
            .open(ConfirmDialogComponent, { data: options })
            .afterClosed()
            .pipe(
                defaultIfEmpty(false),
                map(value => value == true)
            );
    }

}
