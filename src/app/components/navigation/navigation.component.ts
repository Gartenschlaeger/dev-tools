import { Component, EventEmitter, HostListener, OnInit, Output, ViewChild } from '@angular/core';
import { MatSelectionList } from '@angular/material/list';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { ExtendedRoute, routes } from '../../app.routes';
import { ShareService } from '../../modules/shared/services/share.service';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

    items: ExtendedRoute[] = [];
    isOpened: boolean = false;
    searchQuery: string = '';
    newSearchQuery: boolean = false;

    @ViewChild('matSelectionList') matSelectionList!: MatSelectionList;

    @Output() toggleSidenav = new EventEmitter();

    constructor(
        private router: Router,
        private shareService: ShareService) {
    }

    ngOnInit() {
        routes.forEach((route) => {
            route.visible = true;
            if (route.hideInNav) {
                return;
            }

            this.items.push(route);
        });
        this.items.sort(this.itemCompareFn);

        // automatically select the item for active route
        const activeRoute = this.getActiveRoute();
        if (activeRoute) {
            this.activeRouteChanged(activeRoute);
        }

        this.router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                this.shareService.disable();
            } else if (event instanceof NavigationEnd) {
                const activeRoute = this.getActiveRoute();
                if (activeRoute) {
                    this.activeRouteChanged(activeRoute);
                }
            }
        });
    }

    private activeRouteChanged(route: ExtendedRoute) {
        this.setSelectedItem(route);
    }

    private setSelectedItem(item: ExtendedRoute) {
        this.items.map(item => item.selected = false);
        item.selected = true;
    }

    private getActiveRoute() {
        const currentUrl = this.router.url.substring(1);
        return this.items.find(item => {
            return item.path === currentUrl;
        });
    }

    private itemCompareFn(a: ExtendedRoute, b: ExtendedRoute): number {
        if (a.pined === b.pined || !a.pined === !b.pined) {
            if (typeof a.title === 'string' && typeof b.title === 'string') {
                return a.title.localeCompare(b.title);
            }
        } else if (a.pined !== b.pined) {
            return (b.pined ? 1 : 0) - (a.pined ? 1 : 0);
        }

        return 0;
    }

    handleSearchChange() {
        const queryValue: string = this.searchQuery?.toLowerCase()?.trim();
        if (queryValue) {
            this.items.forEach((item) => {
                if (typeof item.title === 'string') {
                    item.visible = item.title.toLowerCase().indexOf(queryValue) !== -1;
                }
            });
        } else {
            this.items.forEach((item) => (item.visible = true));
        }
    }

    public async handleNavigationItemClick(route: ExtendedRoute) {
        if (route.path) {
            await this.router.navigateByUrl(route.path);
        }

        this.toggleSidenav.emit();
    }

    @HostListener('document:keydown.meta.k')
    async openSidenavShortcut() {
        // global shortcut cmd+k to toggle the sidenav
        await this.toggleSidenav.emit();
    }

    private async handleEnterKey() {
        // navigate to selected item on enter
        const selectedItems = this.matSelectionList.selectedOptions.selected;
        if (selectedItems.length) {
            await this.handleNavigationItemClick(selectedItems[0].value);
        } else {
            const visibleItem = this.items.find(i => i.visible);
            if (visibleItem) {
                this.matSelectionList.focus();
            }
        }
    }

    private handleEscapeKey() {
        // clear search input on escape or close sidenav if no search input is available
        if (this.searchQuery) {
            this.searchQuery = '';
            this.handleSearchChange();
        } else {
            this.toggleSidenav.emit();
        }
    }

    private handleAutoSearch(event: KeyboardEvent) {
        // passive search input
        if (/^[a-zA-Z0-9\s]$/.test(event.key)) {
            if (this.newSearchQuery) {
                this.newSearchQuery = false;
                this.searchQuery = '';
            }

            this.searchQuery += event.key;
            this.handleSearchChange();
        } else if (event.key === 'Backspace') {
            this.searchQuery = this.searchQuery.substring(0, this.searchQuery.length - 1);
            this.handleSearchChange();
        }
    }

    @HostListener('document:keyup', ['$event'])
    async handleKeyupEvent(event: KeyboardEvent) {
        if (!this.isOpened) {
            return;
        }

        switch (event.key) {
            case 'Enter':
                await this.handleEnterKey();
                break;
            case 'Escape':
                this.handleEscapeKey();
                break;
            default:
                this.handleAutoSearch(event);
        }
    }

    handleOpenedChanged(isOpened: boolean) {
        this.isOpened = isOpened;
        if (this.isOpened) {
            this.newSearchQuery = true;
            this.matSelectionList.focus();
        }
    }

}
