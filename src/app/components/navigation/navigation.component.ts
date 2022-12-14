import { Component, EventEmitter, HostListener, OnInit, Output, ViewChild } from '@angular/core';
import { MatInput } from '@angular/material/input';
import { ExtendedRoute, routes } from '../../app.routes';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html'
})
export class NavigationComponent implements OnInit {

    normalItems: ExtendedRoute[] = [];
    pinedItems: ExtendedRoute[] = [];
    isOpened: boolean = false;
    searchQuery: string = '';
    newSearchQuery: boolean = false;

    @ViewChild('matSearchInput') matSearchInput!: MatInput;

    @Output() itemClicked = new EventEmitter<ExtendedRoute>();
    @Output() toggleSidenav = new EventEmitter();

    ngOnInit() {
        routes.forEach((route) => {
            route.visible = true;

            if (route.hideInNav) {
                return;
            }

            if (route.pined) {
                this.pinedItems.push(route);
            } else {
                this.normalItems.push(route);
            }
        });

        this.normalItems.sort(this.itemCompareFn);
        this.pinedItems.sort(this.itemCompareFn);
    }

    private itemCompareFn(a: ExtendedRoute, b: ExtendedRoute): number {
        if (typeof a.title === 'string' && typeof b.title === 'string') {
            return a.title.localeCompare(b.title);
        }

        return 0;
    }

    handleSearchChange() {
        const queryValue: string = this.searchQuery?.toLowerCase()?.trim();
        if (queryValue) {
            this.normalItems.forEach((item) => {
                if (typeof item.title === 'string') {
                    item.visible = item.title.toLowerCase().indexOf(queryValue) !== -1;
                }
            });
        } else {
            this.normalItems.forEach((item) => (item.visible = true));
        }
    }

    handleSearchClear() {
        this.searchQuery = '';
        this.handleSearchChange();
    }

    @HostListener('document:keydown.meta.k')
    async openSidenavShortcut() {
        // global shortcut cmd+k to toggle the sidenav
        await this.toggleSidenav.emit();
    }

    @HostListener('document:keyup', ['$event'])
    handleKeyupEvent(event: KeyboardEvent) {
        if (!this.isOpened) {
            return;
        }

        // autofocus to search control by text input
        if (!this.matSearchInput.focused && /^[a-zA-Z0-9]$/.test(event.key)) {
            if (this.newSearchQuery) {
                this.newSearchQuery = false;
                this.searchQuery = event.key;
            } else {
                if (!this.matSearchInput.focused) {
                    this.searchQuery += event.key;
                }
            }

            if (!this.matSearchInput.focused) {
                this.matSearchInput.focus();
            }

            this.handleSearchChange();
        }

        // escape: clear text input -> blur the element -> close the sidenav
        if (event.key === 'Escape') {
            if (this.matSearchInput.focused) {
                if (this.searchQuery) {
                    this.searchQuery = '';
                    this.handleSearchChange();
                } else if (document.activeElement instanceof HTMLElement) {
                    document.activeElement.blur();
                }
            } else {
                this.toggleSidenav.emit();
            }
        }
    }

    handleItemClick(item: ExtendedRoute) {
        this.itemClicked.emit(item);
    }

    handleOpenedChanged(isOpened: boolean) {
        this.isOpened = isOpened;
        if (this.isOpened) {
            this.newSearchQuery = true;
        }
    }

}
