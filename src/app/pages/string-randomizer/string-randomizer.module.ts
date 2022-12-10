import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from '../../modules/shared/shared.module';
import { StringRandomizerComponent } from './string-randomizer.component';

const routes: Route[] = [
    {
        path: '',
        component: StringRandomizerComponent
    }
];

@NgModule({
    declarations: [StringRandomizerComponent],
    imports: [CommonModule, RouterModule.forChild(routes), SharedModule]
})
export class StringRandomizerModule {
}
