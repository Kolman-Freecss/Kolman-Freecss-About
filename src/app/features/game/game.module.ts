import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './components';
import { GameRoutingModule } from './game.routing';
import { ToastrModule } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from '../../shared';
import { TranslateModule } from '@ngx-translate/core';
import { SanitizeHtmlPipe } from '../../shared/pipes/sanitize-html.pipe';


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
    SharedModule,
    TranslateModule,
    SanitizeHtmlPipe,
  ],
})
export class GameModule {
}
