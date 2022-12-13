import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from '../../modules/shared/shared.module';
import { JsonFormatterComponent } from './components/json-formatter.component';
import { JsonTreeParserService } from './services/json-tree-parser.service';

const routes: Route[] = [
    {
        path: '',
        component: JsonFormatterComponent
    }
];

@NgModule({
    declarations: [JsonFormatterComponent],
    imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
    providers: [JsonTreeParserService]
})
export class JsonFormatterModule {
}
