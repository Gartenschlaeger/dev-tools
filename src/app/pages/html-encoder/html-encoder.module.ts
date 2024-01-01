import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { HtmlEncoderComponent } from './html-encoder.component';

const routes: Route[] = [
    {
        path: '',
        component: HtmlEncoderComponent
    }
];

@NgModule({
    declarations: [HtmlEncoderComponent],
    imports: [CommonModule, RouterModule.forChild(routes), SharedModule]
})
export default class HtmlEncoderModule {}
