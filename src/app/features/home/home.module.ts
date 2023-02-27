import { NgModule } from '@angular/core';
import { HeaderComponent } from '../../shared/components/layout/header';
import { HomeComponent } from './components';
import { HomeRoutingModule } from './home.routing';
import { SharedModule } from '../../shared';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent,
  ],
  imports: [
    HomeRoutingModule,
    CommonModule,
    FontAwesomeModule,
  ],
})
export class HomeModule {
}
