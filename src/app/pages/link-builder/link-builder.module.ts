import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from '../../modules/shared/shared.module';
import { LinkBuilderComponent } from './components/link-builder/link-builder.component';

const routes: Route[] = [
    {
        path: '',
        component: LinkBuilderComponent
    }
];

@NgModule({
    declarations: [LinkBuilderComponent],
    imports: [CommonModule, RouterModule.forChild(routes), SharedModule]
})
export default class LinkBuilderModule {
}
