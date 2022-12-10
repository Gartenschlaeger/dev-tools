import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from '../../modules/shared/shared.module';
import { TextDiffComponent } from './components/text-diff.component';
import { FormatLinePipe } from './pipes/format-line.pipe';

const routes: Route[] = [
    {
        path: '',
        component: TextDiffComponent
    }
];

@NgModule({
    declarations: [TextDiffComponent, FormatLinePipe],
    imports: [CommonModule, RouterModule.forChild(routes), SharedModule]
})
export class TextDiffModule {
}
