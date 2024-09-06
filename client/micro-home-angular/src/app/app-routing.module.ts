import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CONTEXT_PATH, GAMES_PATH, HOME_PATH, ORIGIN_PATH } from './shared/paths';
import { APP_BASE_HREF } from '@angular/common';
import { EmptyRouteComponent } from './empty-route/empty-route.component';

const routes: Routes = [
  { path: '', redirectTo: ORIGIN_PATH + "/" + HOME_PATH, pathMatch: 'full' },
  { path: ORIGIN_PATH, redirectTo: ORIGIN_PATH + "/" + HOME_PATH, pathMatch: 'full' },
  { path: ORIGIN_PATH + "/" + HOME_PATH, loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule) },
  { path: ORIGIN_PATH + "/" + GAMES_PATH, loadChildren: () => import('./features/game/game.module').then(m => m.GameModule) },
  { path: '**', component: EmptyRouteComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [{ provide: APP_BASE_HREF, useValue: '/' + CONTEXT_PATH + '/' }],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
