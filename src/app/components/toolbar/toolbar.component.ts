import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ShareService } from '../../modules/shared/services/share.service';
import { SelectedThemeName, ThemeSwitchService } from '../../modules/shared/services/theme-switch.service';
import { SharedDialogsService } from '../shared-dialogs/services/shared-dialogs.service';

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

    @Output() toggleSidenav = new EventEmitter();

    shareButtonVisible = false;
    shareButtonEnabled = false;

    constructor(private themeService: ThemeSwitchService,
                public shareService: ShareService,
                private sharedDialogsService: SharedDialogsService) {
    }

    public ngOnInit() {
        this.shareService.activated$.subscribe(activated => {
            setTimeout(() => {
                this.shareButtonVisible = activated;
            });
        });
        this.shareService.enabled$.subscribe(enabled => {
            setTimeout(() => {
                this.shareButtonEnabled = enabled;
            });
        });
    }

    public handleSetTheme(theme: SelectedThemeName) {
        this.themeService.change(theme);
    }

    public handleShare() {
        this.sharedDialogsService.openConfirmDialog({
            title: 'Seite teilen',
            message: 'Hiermit wird eine teilbare URL erstellt.\nDie URL bleibt 30 Tage lang gültig?'
        }).subscribe(confirmed => {
            if (confirmed) {
                this.shareService.startShare();
            }
        });
    }

    public handleLogin() {
        alert('todo: handleLogin()');
    }

}
