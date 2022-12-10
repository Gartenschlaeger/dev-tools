import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from '../../modules/shared/shared.module';
import { JsonPathComponent } from './components/json-path.component';

const routes: Route[] = [
    {
        path: '',
        component: JsonPathComponent
    }
];

@NgModule({
    declarations: [JsonPathComponent],
    imports: [CommonModule, RouterModule.forChild(routes), SharedModule]
})
export class JsonPathModule {
}
