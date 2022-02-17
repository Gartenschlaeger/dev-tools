import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FormTextComponent } from 'src/app/controls/form-text/form-text.component'
import { NavigationComponent } from 'src/app/controls/navigation/navigation.component'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { ButtonComponent } from './controls/button/button.component'
import { FormGroupComponent } from './controls/form-group/form-group.component'
import { FormTextareaComponent } from './controls/form-textarea/form-textarea.component'
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
        ButtonComponent,
        FormTextComponent,
        FormTextareaComponent,
        FormGroupComponent,
    ],
    imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, FormsModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
