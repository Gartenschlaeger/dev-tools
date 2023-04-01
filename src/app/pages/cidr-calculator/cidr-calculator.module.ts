import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { CidrCalculatorComponent } from './cidr-calculator/cidr-calculator.component';

const routes: Route[] = [
    {
        path: '',
        component: CidrCalculatorComponent
    }
];

@NgModule({
    declarations: [CidrCalculatorComponent],
    imports: [CommonModule, RouterModule.forChild(routes), SharedModule]
})
export default class CidrCalculatorModule {}
