import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ShareService } from '../../modules/shared/services/share.service';
import { SelectedThemeName, ThemeSwitchService } from '../../modules/shared/services/theme-switch.service';

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

    @Output() toggleSidenav = new EventEmitter();

    constructor(
        private themeService: ThemeSwitchService,
        public shareService: ShareService) {
    }

    public ngOnInit() {
        this.shareService.enabled$.subscribe(v => console.log);
    }

    public handleSetTheme(theme: SelectedThemeName) {
        this.themeService.change(theme);
    }

    public handleShare() {
        alert('todo: handleShare()');
    }

    public handleLogin() {
        alert('todo: handleLogin()');
    }

}
