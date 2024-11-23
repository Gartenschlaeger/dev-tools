import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from '../../modules/shared/shared.module';
import { JwtAnalyzerComponent } from './components/jwt-analyzer/jwt-analyzer.component';

const routes: Route[] = [
    {
        path: '',
        component: JwtAnalyzerComponent
    }
];

@NgModule({
    declarations: [JwtAnalyzerComponent],
    imports: [CommonModule, RouterModule.forChild(routes), SharedModule]
})
export default class JwtAnalyzerModule {}
