import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './features/home';
import { NavComponent } from './shared/components/layout/nav';
import { FooterComponent } from './shared/components/layout/footer';
import { GameModule } from './features/game';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    GameModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
