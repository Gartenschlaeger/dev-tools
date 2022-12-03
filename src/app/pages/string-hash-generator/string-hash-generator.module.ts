import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from '../../modules/shared/shared.module';
import { StringHashGeneratorComponent } from './string-hash-generator.component';

const routes: Route[] = [
    {
        path: ':algorithm',
        component: StringHashGeneratorComponent
    }
];

@NgModule({
    declarations: [StringHashGeneratorComponent],
    imports: [CommonModule, RouterModule.forChild(routes), SharedModule]
})
export class StringHashGeneratorModule {
}
