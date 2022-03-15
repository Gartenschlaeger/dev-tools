import { AfterContentInit, Component, ContentChildren, QueryList } from '@angular/core'
import { TabComponent } from 'src/app/controls/tab/tab.component'

@Component({
    selector: 'app-tab-control',
    templateUrl: './tab-control.component.html'
})
export class TabControlComponent implements AfterContentInit {
    @ContentChildren(TabComponent) tabs!: QueryList<TabComponent>

    handleTabClick(tab: TabComponent) {
        this.selectTab(tab)
    }

    ngAfterContentInit(): void {
        const activeTab = this.tabs.filter((t) => t.isActive)
        if (activeTab.length == 0) {
            this.tabs.first.isActive = true
        }
    }

    selectTab(tab: TabComponent) {
        if (!tab.isActive) {
            this.tabs.forEach((tab) => (tab.isActive = false))
            tab.isActive = true
        }
    }
}
