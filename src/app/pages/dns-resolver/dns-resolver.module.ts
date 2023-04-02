import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { DnsResolverComponent } from './dns-resolver/dns-resolver.component';

const routes: Route[] = [
    {
        path: '',
        component: DnsResolverComponent
    }
];

@NgModule({
    declarations: [DnsResolverComponent],
    imports: [CommonModule, RouterModule.forChild(routes), SharedModule]
})
export default class DnsResolverModule {}
