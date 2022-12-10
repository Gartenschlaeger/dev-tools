import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from '../../modules/shared/shared.module';
import { DaysBetweenComponent } from './days-between.component';

const routes: Route[] = [
    {
        path: '',
        component: DaysBetweenComponent
    }
];

@NgModule({
    declarations: [DaysBetweenComponent],
    imports: [CommonModule, RouterModule.forChild(routes), SharedModule]
})
export class DaysBetweenModule {
}
