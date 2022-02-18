import { Component, Input, OnInit } from '@angular/core'

@Component({
    selector: 'app-navigation-link',
    templateUrl: './navigation-link.component.html'
})
export class NavigationLinkComponent implements OnInit {
    @Input() name?: string
    @Input() routerUrl?: string

    constructor() {}

    ngOnInit(): void {}
}
