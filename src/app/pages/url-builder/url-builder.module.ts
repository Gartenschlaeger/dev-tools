import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from '../../modules/shared/shared.module';
import { UrlBuilderComponent } from './components/url-builder/url-builder.component';

const routes: Route[] = [
    {
        path: '',
        component: UrlBuilderComponent
    }
];

@NgModule({
    declarations: [UrlBuilderComponent],
    imports: [CommonModule, RouterModule.forChild(routes), SharedModule]
})
export default class UrlBuilderModule {}
