import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CONTACT_PATH, GAMES_PATH, HOME_PATH } from './shared/paths';

const routes: Routes = [
  { path: '', redirectTo: HOME_PATH, pathMatch: 'full' },
  { path: HOME_PATH, loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule) },
  { path: GAMES_PATH, loadChildren: () => import('./features/game/game.module').then(m => m.GameModule) },
  { path: CONTACT_PATH, loadChildren: () => import('./features/contact/contact.module').then(m => m.ContactModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
