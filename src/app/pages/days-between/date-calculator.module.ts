import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from '../../modules/shared/shared.module';
import { DateCalculatorComponent } from './components/date-calculator.component';

const routes: Route[] = [
    {
        path: '',
        component: DateCalculatorComponent
    }
];

@NgModule({
    declarations: [DateCalculatorComponent],
    imports: [CommonModule, RouterModule.forChild(routes), SharedModule]
})
export default class DateCalculatorModule {}
