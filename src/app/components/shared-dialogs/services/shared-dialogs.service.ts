import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { TextInputDialogComponent } from '../dialogs/text-input-dialog.component';
import { TextInputDialogOptions } from '../dialogs/TextInputDialogOptions';

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

}
