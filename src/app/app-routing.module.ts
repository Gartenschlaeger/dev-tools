import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { HomePageComponent } from 'src/app/pages/home-page/home-page.component'
import { UrlAnalyzerPageComponent } from 'src/app/pages/url-analyzer-page/url-analyzer-page.component'

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'home' },
    { path: 'home', component: HomePageComponent },
    { path: 'url-analyzer', component: UrlAnalyzerPageComponent }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
