import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { HtmlDecoderComponent } from './html-decoder.component';

const routes: Route[] = [
    {
        path: '',
        component: HtmlDecoderComponent
    }
];

@NgModule({
    declarations: [HtmlDecoderComponent],
    imports: [CommonModule, RouterModule.forChild(routes), SharedModule]
})
export default class HtmlDecoderModule {}
