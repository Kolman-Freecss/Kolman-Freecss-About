import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './features/home';
import { NavComponent } from './shared/components/layout/nav';
import { FooterComponent } from './shared/components/layout/footer';
import { GameModule } from './features/game';
import { BackgroundComponent } from './shared/components/layout/background';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared';
import { StoreModule } from '@ngrx/store';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './locale/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    BackgroundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    GameModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    SharedModule,
    StoreModule.forRoot({}, {}),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    provideHttpClient()
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
