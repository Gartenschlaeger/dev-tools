import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from '../../modules/shared/shared.module';
import { GuidGeneratorComponent } from './components/guid-generator.component';

const routes: Route[] = [
    {
        path: '',
        component: GuidGeneratorComponent
    }
];

@NgModule({
    declarations: [GuidGeneratorComponent],
    imports: [CommonModule, RouterModule.forChild(routes), SharedModule]
})
export default class GuidGeneratorModule {}
