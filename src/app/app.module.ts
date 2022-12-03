import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NavigationLinkComponent } from 'src/app/components/navigation-link/navigation-link.component';
import { NavigationComponent } from 'src/app/components/navigation/navigation.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { URLEncoderComponent } from 'src/app/pages/url-encoder/url-encoder.component';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { Base64Component } from './pages/base64/base64.component';
import { BitCalculatorComponent } from './pages/bit-calculator/bit-calculator.component';
import { ColorPickerComponent } from './pages/color-picker/color-picker.component';
import { DaysBetweenComponent } from './pages/days-between/days-between.component';
import { DockerRunPageComponent } from './pages/docker-run-page/docker-run-page.component';
import { GuidGeneratorComponent } from './pages/guid-generator/guid-generator.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { JsonFormatterComponent } from './pages/json-formatter/json-formatter.component';
import { JsonParserComponent } from './pages/json-parser/json-parser.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { StringGeneratorComponent } from './pages/string-generator/string-generator.component';
import { StringRandomizerComponent } from './pages/string-randomizer/string-randomizer.component';
import { UrlAnalyzerPageComponent } from './pages/url-analyzer-page/url-analyzer-page.component';

@NgModule({
    declarations: [
        AppComponent,
        NavigationComponent,
        NavigationLinkComponent,
        HomePageComponent,
        UrlAnalyzerPageComponent,
        DockerRunPageComponent,
        DaysBetweenComponent,
        URLEncoderComponent,
        GuidGeneratorComponent,
        Base64Component,
        NotFoundComponent,
        JsonFormatterComponent,
        JsonParserComponent,
        StringRandomizerComponent,
        StringGeneratorComponent,
        ColorPickerComponent,
        BitCalculatorComponent
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(routes),
        BrowserAnimationsModule,
        SharedModule.forRoot({ minLogLevel: environment.minLogLevel }),
        MatSliderModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatSidenavModule,
        MatFormFieldModule,
        MatCheckboxModule,
        MatInputModule,
        MatSelectModule,
        MatListModule,
        MatCardModule,
        MatTabsModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
