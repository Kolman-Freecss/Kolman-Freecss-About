import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './components';
import { GameRoutingModule } from './game.routing';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    GameComponent,
  ],
  imports: [
    CommonModule,
    GameRoutingModule,
    ToastrModule.forRoot(),
  ],
})
export class GameModule {
}
