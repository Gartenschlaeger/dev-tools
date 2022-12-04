import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { items } from '../../app.navigation-items';
import { INavigationItem } from '../../entities/INavigationItem';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html'
})
export class NavigationComponent implements OnInit {
    itemsNormal: INavigationItem[] = [];
    itemsSticked: INavigationItem[] = [];
    searchQuery: string = '';

    @Output() itemClicked = new EventEmitter<INavigationItem>();

    ngOnInit() {
        items.forEach((item) => {
            item.isVisible = true;
            if (item.isSticked) {
                this.itemsSticked.push(item);
            } else {
                this.itemsNormal.push(item);
            }
        });

        this.itemsNormal.sort((a, b) => a.title.localeCompare(b.title));
        this.itemsSticked.sort((a, b) => a.title.localeCompare(b.title));
    }

    handleSearchChange() {
        const queryValue: string = this.searchQuery?.toLowerCase()?.trim();
        if (queryValue) {
            this.itemsNormal.forEach((item) => {
                item.isVisible = item.title.toLowerCase().indexOf(queryValue) !== -1;
            });
        } else {
            this.itemsNormal.forEach((item) => (item.isVisible = true));
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

    handleItemClick(item: INavigationItem) {
        this.searchQuery = '';
        this.handleSearchChange();
        this.itemClicked.emit(item);
    }
}
