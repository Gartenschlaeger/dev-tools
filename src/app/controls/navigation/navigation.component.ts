import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'

export interface INavigationItem {
    title: string
    routerLink: string
    isVisible: boolean
}

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html'
})
export class NavigationComponent implements OnInit {
    @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>

    items: INavigationItem[] = []

    ngOnInit(): void {
        this.items.push({
            title: 'Home',
            routerLink: '/home',
            isVisible: true
        })
        this.items.push({
            title: 'URL Analyzer',
            routerLink: '/url-analyzer',
            isVisible: true
        })
        this.items.push({
            title: 'Docker Run',
            routerLink: '/docker-run',
            isVisible: true
        })
    }

    handleSearch(e: KeyboardEvent) {
        if (e.key === 'Escape') {
            this.searchInput.nativeElement.value = ''
        }

        const searchValue = this.searchInput.nativeElement.value.toLowerCase()
        this.items.forEach((item) => {
            item.isVisible = item.title.toLowerCase().indexOf(searchValue) !== -1
        })
    }
}
