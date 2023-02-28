import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './components';
import { GameRoutingModule } from './game.routing';
import { ToastrModule } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    GameComponent,
  ],
  imports: [
    CommonModule,
    GameRoutingModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
  ],
})
export class GameModule {
}
