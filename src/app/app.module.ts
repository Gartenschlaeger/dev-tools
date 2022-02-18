import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NavigationComponent } from 'src/app/controls/navigation/navigation.component'
import { FormButtonModule } from 'src/app/shared/form-elements/form-button/form-button.module'
import { FormInputModule } from 'src/app/shared/form-elements/form-input/form-input.module'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { ButtonComponent } from './controls/button/button.component'
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
        ButtonComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormInputModule,
        FormButtonModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
