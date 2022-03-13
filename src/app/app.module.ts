import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NavigationComponent } from 'src/app/controls/navigation/navigation.component'
import { FormService } from 'src/app/services/form-service.service'
import { FormFieldErrorsModule } from 'src/app/shared/form-field-errors/form-field-errors.module'
import { SvgIconModule } from 'src/app/shared/svg-icon/svg-icon.module'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { ButtonComponent } from './controls/button/button.component'
import { NavigationLinkComponent } from './controls/navigation-link/navigation-link.component'
import { PageHeaderComponent } from './controls/page-header/page-header.component'
import { DockerRunPageComponent } from './pages/docker-run-page/docker-run-page.component'
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
        DockerRunPageComponent,
        PageHeaderComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormFieldErrorsModule,
        SvgIconModule
    ],
    providers: [FormService],
    bootstrap: [AppComponent]
})
export class AppModule {}
