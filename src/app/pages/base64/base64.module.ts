import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from '../../modules/shared/shared.module';
import { Base64Component } from './components/base64.component';

const routes: Route[] = [
    {
        path: '',
        component: Base64Component
    }
];

@NgModule({
    declarations: [Base64Component],
    imports: [CommonModule, RouterModule.forChild(routes), SharedModule]
})
export default class Base64Module {}
