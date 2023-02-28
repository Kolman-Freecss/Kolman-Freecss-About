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
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
