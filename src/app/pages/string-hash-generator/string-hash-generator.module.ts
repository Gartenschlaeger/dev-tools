import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from '../../modules/shared/shared.module';
import { StringHashGeneratorComponent } from './components/string-hash-generator.component';

const routes: Route[] = [
    {
        path: '',
        component: StringHashGeneratorComponent
    }
];

@NgModule({
    declarations: [StringHashGeneratorComponent],
    imports: [CommonModule, RouterModule.forChild(routes), SharedModule]
})
export default class StringHashGeneratorModule {}
