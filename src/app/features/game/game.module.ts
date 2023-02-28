import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './components';
import { GameRoutingModule } from './game.routing';
import { ToastrModule } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    GameComponent,
  ],
  imports: [
    CommonModule,
    GameRoutingModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    FontAwesomeModule,
  ],
})
export class GameModule {
}
