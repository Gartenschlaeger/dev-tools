import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from '../../modules/shared/shared.module';
import { ChmodCalculatorComponent } from './chmod-calculator/chmod-calculator.component';

const routes: Route[] = [
    {
        path: '',
        component: ChmodCalculatorComponent
    }
];

@NgModule({
    declarations: [ChmodCalculatorComponent],
    imports: [CommonModule, RouterModule.forChild(routes), SharedModule]
})
export class ChmodCalculatorModule {
}
