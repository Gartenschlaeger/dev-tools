import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NavigationComponent } from 'src/app/controls/navigation/navigation.component'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { NavigationLinkComponent } from './controls/navigation-link/navigation-link.component'
import { HomePageComponent } from './pages/home-page/home-page.component'
import { UrlAnalyzerPageComponent } from './pages/url-analyzer-page/url-analyzer-page.component'

@NgModule({
    declarations: [
        AppComponent,
        NavigationComponent,
        NavigationLinkComponent,
        HomePageComponent,
        UrlAnalyzerPageComponent,
    ],
    imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, FormsModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
