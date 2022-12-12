import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-highlighted-code',
    templateUrl: './highlighted-code.component.html',
    styleUrls: ['./highlighted-code.component.scss']
})
export class HighlightedCodeComponent implements OnInit {

    @Input() code?: string;
    @Input() autoSelect: boolean = true;
    @Input() language: 'json' | 'bash' | 'typescript' = 'json';

    constructor() {
    }

    ngOnInit(): void {
    }

}
