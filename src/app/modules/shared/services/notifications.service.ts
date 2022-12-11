import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})
export class NotificationsService {

    constructor(private snackBar: MatSnackBar) {
    }

    public show(message: string, duration?: number) {
        this.snackBar.open('Copied to clipboard',
            undefined, {
                duration: duration || 2000,
                horizontalPosition: 'right'
            });
    }

}
