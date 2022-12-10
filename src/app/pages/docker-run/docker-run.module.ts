import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from '../../modules/shared/shared.module';
import { DockerRunComponent } from './docker-run.component';

const routes: Route[] = [
    {
        path: '',
        component: DockerRunComponent
    }
];

@NgModule({
    declarations: [DockerRunComponent],
    imports: [CommonModule, RouterModule.forChild(routes), SharedModule]
})
export class DockerRunModule {
}
