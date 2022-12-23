import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from '../../modules/shared/shared.module';
import {
    CurrentTimestampDialogComponent
} from './components/current-timestamp-dialog/current-timestamp-dialog.component';
import {
    UnixTimestampCalculatorDialogComponent
} from './components/unix-timestamp-calculator-dialog/unix-timestamp-calculator-dialog.component';
import { UnixTimestampComponent } from './components/unix-timestamp.component';

const routes: Route[] = [
    {
        path: '',
        component: UnixTimestampComponent
    }
];

@NgModule({
    declarations: [UnixTimestampComponent, UnixTimestampCalculatorDialogComponent, CurrentTimestampDialogComponent],
    imports: [CommonModule, RouterModule.forChild(routes), SharedModule]
})
export default class UnixTimestampModule {
}
