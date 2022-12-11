import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
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

    handleSearchKeyup(event: KeyboardEvent) {
        if (event.key === 'Escape') {
            if (this.searchQuery) {
                this.searchQuery = '';
                this.handleSearchChange();
            }
        }
    }

    handleGlobalKeyUp(event: KeyboardEvent) {
        if (this.isOpened &&
            event.key >= 'a' && event.key <= 'z') {

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
