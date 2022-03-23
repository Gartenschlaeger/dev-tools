import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { DaysBetweenComponent } from 'src/app/pages/days-between/days-between.component'
import { DockerRunPageComponent } from 'src/app/pages/docker-run-page/docker-run-page.component'
import { GuidGeneratorComponent } from 'src/app/pages/guid-generator/guid-generator.component'
import { HomePageComponent } from 'src/app/pages/home-page/home-page.component'
import { UrlAnalyzerPageComponent } from 'src/app/pages/url-analyzer-page/url-analyzer-page.component'
import { URLDecoderPageComponent } from 'src/app/pages/url-decoder-page/url-decoder-page.component'

const routes: Routes = [
	{ path: '', pathMatch: 'full', redirectTo: 'home' },
	{ path: 'home', component: HomePageComponent },
	{ path: 'url-analyzer', component: UrlAnalyzerPageComponent },
	{ path: 'url-decoder', component: URLDecoderPageComponent },
	{ path: 'docker-run', component: DockerRunPageComponent },
	{ path: 'days-between', component: DaysBetweenComponent },
	{ path: 'guid-generator', component: GuidGeneratorComponent }
]

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
