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
import { SanitizeHtmlPipe } from './shared/pipes/sanitize-html.pipe';
import { provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../environments/environment';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MouseFollowerComponent } from './shared/components/mouse-follower/mouse-follower.component';
import { NgOptimizedImage } from '@angular/common';
import { assetUrl } from '../single-spa/asset-url';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, assetUrl('/locale/'), '.json');
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
        deps: [HttpClient],
      },
    }),
    MatFormFieldModule, MatSelectModule, FormsModule, ReactiveFormsModule,
    SanitizeHtmlPipe, MouseFollowerComponent, NgOptimizedImage,
  ],
  providers: [
    provideHttpClient(),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
