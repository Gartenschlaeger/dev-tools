import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from '../../modules/shared/shared.module';
import { URLEncoderComponent } from './components/url-encoder.component';

const routes: Route[] = [
    {
        path: '',
        component: URLEncoderComponent
    }
];

@NgModule({
    declarations: [URLEncoderComponent],
    imports: [CommonModule, RouterModule.forChild(routes), SharedModule]
})
export class UrlEncoderModule {
}
