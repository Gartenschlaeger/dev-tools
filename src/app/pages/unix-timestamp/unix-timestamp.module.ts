import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from '../../modules/shared/shared.module';
import { UnixTimestampComponent } from './components/unix-timestamp.component';

const routes: Route[] = [
    {
        path: '',
        component: UnixTimestampComponent
    }
];

@NgModule({
    declarations: [UnixTimestampComponent],
    imports: [CommonModule, RouterModule.forChild(routes), SharedModule]
})
export class UnixTimestampModule {
}
