import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ExtendedRoute, routes } from '../../app.routes';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html'
})
export class NavigationComponent implements OnInit {
    normalItems: ExtendedRoute[] = [];
    pinedItems: ExtendedRoute[] = [];
    searchQuery: string = '';

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

        this.normalItems.sort(this.compareFn);
        this.pinedItems.sort(this.compareFn);
    }

    private compareFn(a: ExtendedRoute, b: ExtendedRoute): number {
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

    handleSearchKeyup(event: KeyboardEvent) {
        if (event.key === 'Escape') {
            this.searchQuery = '';
            this.handleSearchChange();
        }
    }

    handleSearchClear() {
        this.searchQuery = '';
        this.handleSearchChange();
    }

    handleItemClick(item: ExtendedRoute) {
        //this.searchQuery = '';
        //this.handleSearchChange();
        this.itemClicked.emit(item);
    }
}
