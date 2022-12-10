import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from '../../modules/shared/shared.module';
import { JsonParserComponent } from './json-parser.component';

const routes: Route[] = [
    {
        path: '',
        component: JsonParserComponent
    }
];

@NgModule({
    declarations: [JsonParserComponent],
    imports: [CommonModule, RouterModule.forChild(routes), SharedModule]
})
export class JsonParserModule {
}
