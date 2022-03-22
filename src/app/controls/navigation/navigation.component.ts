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
        this.pushItem('Home', '/home')
        this.pushItem('URL Aanalyzer', '/url-analyzer')
        this.pushItem('Docker Run', '/docker-run')
        this.pushItem('Days between', '/days-between')
    }

    pushItem(title: string, url: string) {
        this.items.push({
            title: title,
            routerLink: url,
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
