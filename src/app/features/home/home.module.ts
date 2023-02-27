import { NgModule } from '@angular/core';
import { HeaderComponent } from '../../shared/components/layout/header';
import { HomeComponent } from './components';
import { HomeRoutingModule } from './home.routing';
import { SharedModule } from '../../shared';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent,
  ],
  imports: [
    HomeRoutingModule,
    SharedModule,
    CommonModule
  ],
})
export class HomeModule {
}
