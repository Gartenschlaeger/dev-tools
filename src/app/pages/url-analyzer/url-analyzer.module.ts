import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from '../../modules/shared/shared.module';
import { UrlAnalyzerComponent } from './components/url-analyzer.component';

const routes: Route[] = [
    {
        path: '',
        component: UrlAnalyzerComponent
    }
];

@NgModule({
    declarations: [UrlAnalyzerComponent],
    imports: [CommonModule, RouterModule.forChild(routes), SharedModule]
})
export default class UrlAnalyzerModule {}
