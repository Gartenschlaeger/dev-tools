import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from '../../modules/shared/shared.module';
import { JsonTypeConverterComponent } from './components/json-type-converter.component';

const routes: Route[] = [
    {
        path: '',
        component: JsonTypeConverterComponent
    }
];

@NgModule({
    declarations: [JsonTypeConverterComponent],
    imports: [CommonModule, RouterModule.forChild(routes), SharedModule]
})
export default class JsonTypeConverterModule {
}
