import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from '../../modules/shared/shared.module';
import { StringGeneratorComponent } from './components/string-generator.component';

const routes: Route[] = [
    {
        path: '',
        component: StringGeneratorComponent
    }
];

@NgModule({
    declarations: [StringGeneratorComponent],
    imports: [CommonModule, RouterModule.forChild(routes), SharedModule]
})
export default class StringGeneratorModule {
}
